"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/src/shared/api/http";
import { IResponse } from "@/src/shared/types";
import { USER_JWT_TOKEN_VALIDATE_ENDPOINT } from "@/src/shared/api";
import { useSetDefaultPinpoint } from "@/src/entities/pinpoint";

interface IJwtTokenValidateResponse extends IResponse<boolean> {
  data?: boolean;
}

const setAuthSuccess = () => {
  document.cookie = "is_auth=true; path=/; max-age=900";
};

const setAuthFailure = () => {
  document.cookie = "is_auth=false; path=/; max-age=900";
};

export const useAuthCheck = () => {
  const router = useRouter();
  const { setDefaultPinpoint } = useSetDefaultPinpoint();

  const hasRunRef = useRef(false);
  const setDefaultPinpointRef = useRef(setDefaultPinpoint);

  useEffect(() => {
    setDefaultPinpointRef.current = setDefaultPinpoint;
  }, [setDefaultPinpoint]);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    let cancelled = false;

    const checkAuthStatus = async () => {
      try {
        const response = await http.get<IJwtTokenValidateResponse>(
          USER_JWT_TOKEN_VALIDATE_ENDPOINT
        );

        const authed = response.data !== false;

        if (!authed) {
          setAuthFailure();
          if (!cancelled) router.replace("/login");
          return;
        }

        setAuthSuccess();

        try {
          await setDefaultPinpointRef.current();
        } catch (error) {
          console.error("setDefaultPinpoint failed:", error);
        }

        if (!cancelled) router.replace("/home");
      } catch (error) {
        console.error("auth check failed:", error);
        setAuthFailure();
        if (!cancelled) router.replace("/login");
      }
    };

    checkAuthStatus();

    return () => {
      cancelled = true;
    };
  }, [router]);
};

