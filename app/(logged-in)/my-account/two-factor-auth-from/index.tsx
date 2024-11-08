"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { activate2fa, get2faSecret } from "./action";
import { useToast } from "@/hooks/use-toast";

type props = {
  twoFactorActivated: boolean;
};

export default function TwoFactorAuthForm({ twoFactorActivated }: props) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const handleEnableClick = async () => {
    const response = await get2faSecret();
    if (response.error) {
      toast({
        variant: "destructive",
        title: response.message,
      });
      return;
    }

    setStep(2);
    setCode(response.twoFactorSecret ?? "");
    console.log(response.twoFactorSecret);
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await activate2fa(otp);

    if (response?.error) {
      toast({
        variant: "destructive",
        title: response.message,
      });
      return;
    }

    toast({
      className: "bg-greem-500 text-white ",
      title: "Two-Factor has benn enable",
    });
    setIsActivated(true);
  };

  return (
    <div>
      {!isActivated && (
        <div>
          {step === 1 && (
            <Button onClick={handleEnableClick}>
              ENable Two-factor Authentication
            </Button>
          )}
          {step === 2 && (
            <div>
              <p>
                Scan the QR code below in the Google Authenticator aqpp to
                activate Two-Factor Autheticion
              </p>
              <QRCodeSVG value={code} />
              <Button
                onClick={() => setStep(3)}
                className="w-full my-2 "
                variant="outline"
              >
                ENable Two-factor Authentication
              </Button>
              <Button onClick={() => setStep(1)} className="w-full my-2 ">
                Cancel{" "}
              </Button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleOTPSubmit}>
              <p>Enter one time passcode</p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button disabled={otp.length !== 6} type="submit">
                SUbmit and activate
              </Button>
              <Button onClick={() => setStep(2)}>Cancel </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
