import { Button, Font, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: 'Roboto, "Segoe UI", sans-serif',
  };

  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
  };

  const box = {
    padding: "0 48px",
  };

  const heading = {
    fontSize: "24px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "400",
    color: "#484848",
    padding: "17px 0 0",
  };

  const paragraph = {
    margin: "0 0 15px",
    fontSize: "16px",
    lineHeight: "1.4",
    color: "#3c4149",
  };

  const button = {
    backgroundColor: "#5469d4",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "12px",
    maxWidth: "240px",
    margin: "32px auto",
  };

  const code = {
    fontFamily: "monospace",
    backgroundColor: "#f4f4f4",
    borderRadius: "4px",
    color: "#3c4149",
    fontSize: "24px",
    padding: "8px 16px",
    letterSpacing: "2px",
    textAlign: "center" as const,
    margin: "32px 0",
    display: "block",
  };

  const footer = {
    color: "#898989",
    fontSize: "12px",
    lineHeight: "16px",
    marginTop: "48px",
    textAlign: "center" as const,
  };

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verify Your Email</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your email address with this code: {otp}</Preview>

      <div style={main}>
        <Section style={container}>
          <div style={box}>
            <Heading as="h1" style={heading}>
              Welcome to our platform, {username}!
            </Heading>

            <Text style={paragraph}>
              Thanks for signing up! To complete your registration, please verify your email address by entering the
              code below or clicking the verification button.
            </Text>

            <code style={code}>{otp}</code>

            <Button style={button} href="#">
              Verify Email Address(currently this doesn't work)
            </Button>

            <Text style={paragraph}>If you didn't create an account, you can safely ignore this email.</Text>

            <Text style={footer}>
              This verification code will expire in 30 minutes. If you need a new code, please request one from the
              sign-up page.
            </Text>
          </div>
        </Section>
      </div>
    </Html>
  );
}
