export default function Footer() {
  return (
    <>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a
            target="_blank"
            className="link link-hover"
            href="https://www.drupal.org/project/simple_oauth"
          >
            Simple OAuth (OAuth2) & OpenID Connect
          </a>
        </nav>
      </footer>
    </>
  );
}
