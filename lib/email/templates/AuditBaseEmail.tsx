import * as React from "react";

interface AuditBaseEmailProps {
  name: string;
  headline: string;
  intro: string;
  bodyMarkdown?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// Plantilla React de email transaccional. Compatible con Resend.
// Estética alineada con el deck: negro · verde mid · serif headline.
// Inline styles obligatorios para máxima compatibilidad con clientes de mail.
export function AuditBaseEmail({
  name,
  headline,
  intro,
  bodyMarkdown,
  ctaLabel,
  ctaHref,
}: AuditBaseEmailProps) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{headline}</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#000000" }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px" }}>
                <table
                  role="presentation"
                  width={560}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ maxWidth: 560, width: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: 32 }}>
                        <span
                          style={{
                            fontFamily:
                              "Georgia, 'Cormorant Garamond', serif",
                            fontSize: 18,
                            color: "#ffffff",
                          }}
                        >
                          <span style={{ color: "#4CAF7E" }}>Filmm</span>Aiker
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: 10,
                              letterSpacing: "0.25em",
                              textTransform: "uppercase",
                              color: "#C7C7C7",
                            }}
                          >
                            Studio
                          </span>
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ paddingBottom: 8 }}>
                        <span
                          style={{
                            fontSize: 11,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "#4CAF7E",
                          }}
                        >
                          AltafuIA · Auditoría
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h1
                          style={{
                            margin: 0,
                            fontFamily:
                              "Georgia, 'Cormorant Garamond', serif",
                            fontSize: 36,
                            lineHeight: 1.1,
                            color: "#ffffff",
                            fontWeight: 600,
                          }}
                        >
                          {headline}
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ paddingTop: 24 }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "#C7C7C7",
                          }}
                        >
                          Hola {name}. {intro}
                        </p>
                      </td>
                    </tr>

                    {bodyMarkdown ? (
                      <tr>
                        <td style={{ paddingTop: 24 }}>
                          <pre
                            style={{
                              margin: 0,
                              padding: 0,
                              fontFamily:
                                "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                              fontSize: 15,
                              lineHeight: 1.6,
                              color: "#ffffff",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {bodyMarkdown}
                          </pre>
                        </td>
                      </tr>
                    ) : null}

                    {ctaLabel && ctaHref ? (
                      <tr>
                        <td style={{ paddingTop: 32 }}>
                          <a
                            href={ctaHref}
                            style={{
                              display: "inline-block",
                              padding: "14px 24px",
                              backgroundColor: "#4CAF7E",
                              color: "#000000",
                              fontWeight: 600,
                              textDecoration: "none",
                              borderRadius: 8,
                            }}
                          >
                            {ctaLabel}
                          </a>
                        </td>
                      </tr>
                    ) : null}

                    <tr>
                      <td style={{ paddingTop: 48 }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            color: "#6B6B6B",
                            lineHeight: 1.6,
                          }}
                        >
                          The Human Layer™ · FilmmAiker Studio
                          <br />
                          Si no querés más mails como este, respondé "baja" y
                          te sacamos.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
