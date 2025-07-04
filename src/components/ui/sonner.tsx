import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";  // Rename import to avoid conflict
import type { ToasterProps } from "sonner";

const ThemedToaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { ThemedToaster as Toaster };
