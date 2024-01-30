// AuthProvider.test.tsx
import { render, renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AuthProvider, { useAuth } from "./AuthContext";



test("AuthProvider", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <AuthProvider>
          <div>Test Child</div>
        </AuthProvider>
      );

      expect(getByText("Test Child")).toBeInTheDocument();
    });
  });

  describe("useAuth", () => {
    it("should throw an error outside AuthProvider", () => {
      const { result } = renderHook(() => useAuth());

      expect(result.error).toEqual(
        new Error("useAuth must be used within an AuthProvider")
      );
    });
  });
});
