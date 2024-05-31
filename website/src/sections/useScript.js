import { useEffect } from 'react';

function useScript(src, licenseKeys, callback) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (window.zingchart) {
        window.zingchart.LICENSE = licenseKeys;
        if (callback) callback();
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [src, licenseKeys, callback]);
}

export default useScript;