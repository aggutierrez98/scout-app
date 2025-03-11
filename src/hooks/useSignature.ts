import { useState } from "react";

export const useSignature = (onSignature?: () => Promise<void>) => {
    const [getSignaturePad, setSignaturePad] = useState(false);
    const [signatureBase64, setSignatureBase64] = useState("");
    const getSignature = () => {
        setSignaturePad(true);
    }

    const handleSignature = async (signature: string) => {
        setSignatureBase64(signature);
        setSignaturePad(false);
        if (onSignature) await onSignature()
    }

    return {
        handleSignature,
        getSignature,
        getSignaturePad,
        signatureBase64,
    }
};