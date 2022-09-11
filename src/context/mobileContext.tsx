import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IMobileContext {
  isMobile: boolean;
}

const MobileContext = createContext<IMobileContext>({
  isMobile: false,
});

export const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIfMobileOrTablet = useCallback(() => {
    window.matchMedia("(max-width: 475px)").matches
      ? setIsMobile(true)
      : setIsMobile(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkIfMobileOrTablet);
    return () => window.removeEventListener("resize", checkIfMobileOrTablet);
  }, [checkIfMobileOrTablet]);

  useEffect(() => {
    checkIfMobileOrTablet();
  }, [checkIfMobileOrTablet]);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => useContext(MobileContext);
