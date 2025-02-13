import { createContext, useContext, useEffect, useState } from "react";
import { PublicClientApplication, Configuration } from "@azure/msal-browser";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  clientId: string;
  tenantId: string;
}

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const pca = new PublicClientApplication(msalConfig);

// Initialize MSAL
pca.initialize().then(() => {
  const accounts = pca.getAllAccounts();
  if (accounts.length > 0) {
    pca.setActiveAccount(accounts[0]);
  }
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getAccessToken = async () => {
    try {
      const account = pca.getActiveAccount();
      if (!account) {
        throw new Error("No active account");
      }

      const request = {
        scopes: [
          "https://graph.microsoft.com/Files.Read.All",
          "https://graph.microsoft.com/Sites.Read.All",
        ],
        account: account,
      };

      try {
        const response = await pca.acquireTokenSilent(request);
        console.log("Got access token silently:", response);
        return response.accessToken;
      } catch (error) {
        console.log("Silent token acquisition failed, trying popup", error);
        const response = await pca.acquireTokenPopup(request);
        console.log("Got access token via popup:", response);
        return response.accessToken;
      }
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  const login = async () => {
    try {
      const loginResponse = await pca.loginPopup({
        scopes: [
          "https://graph.microsoft.com/Files.Read.All",
          "https://graph.microsoft.com/Sites.Read.All",
        ],
      });
      console.log("Login successful:", loginResponse);

      pca.setActiveAccount(loginResponse.account);
      const token = await getAccessToken();
      setAccessToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await pca.logoutPopup();
      setAccessToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Auto-login on mount
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const account = pca.getActiveAccount();
        if (account) {
          console.log("Found active account, attempting to get token");
          const token = await getAccessToken();
          setAccessToken(token);
          setIsAuthenticated(true);
        } else {
          console.log("No active account found");
        }
      } catch (error) {
        console.error("Auto-login failed:", error);
      }
    };
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
