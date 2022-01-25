export const Footer = () => {
  return (
    <footer className="bg-gray-900 flex justify-center text-white py-3 text-xs mt-16">
      Salsa Therapy {new Date().getFullYear()} &copy;&nbsp;|&nbsp;
      <a href="/privacy-policy" className="hover:underline">
        Privacy Policy
      </a>
    </footer>
  );
};
