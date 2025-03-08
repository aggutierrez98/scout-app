import { useState } from "react";

export const useSignature = () => {
    const [getSignaturePad, setSignaturePad] = useState(false);
    const [signatureBase64, setSignatureBase64] = useState("");
    const [signatureArrayBuffer, setSignatureArrayBuffer] = useState<Blob>();
    const getSignature = () => {
        setSignaturePad(true);
    }

    const handleSignature = (signature: string) => {
        setSignatureBase64(signature);
        setSignaturePad(false);
    }

    return {
        handleSignature,
        getSignature,
        signatureArrayBuffer,
        getSignaturePad,
        signatureBase64,
    }
};