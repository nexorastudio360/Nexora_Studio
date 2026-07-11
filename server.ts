import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set high limits for JSON and URLencoded parsing to support base64 file attachments up to 20MB
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Project Inquiry API Endpoint
app.post("/api/inquiry", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      country,
      company,
      industry,
      businessType,
      currentWebsite,
      budget,
      timeline,
      projectTypes = [],
      pages,
      requiredFeatures = [],
      brandStyle = [],
      referenceWebsites,
      objectives,
      additionalNotes,
      files = [],
      browser = "Unknown Browser",
      device = "Unknown Device"
    } = req.body;

    // Validate core fields
    if (!name || !email || !objectives) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: Name, Email, and Project Objectives are mandatory."
      });
    }

    const submissionDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }) + " (PST)";

    // Construct a beautiful HTML email template
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Nexora Studio Project Inquiry</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 650px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 13px;
            color: #94a3b8;
            font-family: monospace;
          }
          .content {
            padding: 40px 30px;
          }
          .section-title {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #2563eb;
            border-bottom: 2px solid #eff6ff;
            padding-bottom: 8px;
            margin-top: 30px;
            margin-bottom: 15px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 3px;
          }
          .value {
            font-size: 14px;
            color: #0f172a;
            font-weight: 500;
          }
          .value-block {
            background: #f8fafc;
            padding: 12px 15px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            border: 1px solid #f1f5f9;
            white-space: pre-wrap;
          }
          .chip {
            display: inline-block;
            background: #eff6ff;
            color: #1e40af;
            font-size: 11px;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 9999px;
            margin-right: 5px;
            margin-bottom: 5px;
            border: 1px solid #dbeafe;
          }
          .chip-style {
            background: #faf5ff;
            color: #6b21a8;
            border-color: #f3e8ff;
          }
          .chip-type {
            background: #f0fdf4;
            color: #166534;
            border-color: #dcfce7;
          }
          .footer {
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
          .footer a {
            color: #2563eb;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NEXORA STUDIO</h1>
            <p>PROJECT DISCOVERY SYSTEM INTAKE</p>
          </div>
          <div class="content">
            <div class="section-title" style="margin-top: 0;">CLIENT PROFILE</div>
            <div class="grid">
              <div class="field">
                <div class="label">Client Name</div>
                <div class="value" style="font-size: 16px; font-weight: 700; color: #2563eb;">${name}</div>
              </div>
              <div class="field">
                <div class="label">Business Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${phone || "Not Provided"}</div>
              </div>
              <div class="field">
                <div class="label">Country / Territory</div>
                <div class="value">${country || "Not Provided"}</div>
              </div>
              <div class="field">
                <div class="label">Company Name</div>
                <div class="value">${company || "Not Provided"}</div>
              </div>
              <div class="field">
                <div class="label">Industry / Sector</div>
                <div class="value">${industry || "Not Provided"}</div>
              </div>
              <div class="field">
                <div class="label">Business Type</div>
                <div class="value">${businessType || "Not Provided"}</div>
              </div>
              <div class="field">
                <div class="label">Current Website</div>
                <div class="value">
                  ${currentWebsite ? `<a href="${currentWebsite}" target="_blank">${currentWebsite}</a>` : "None"}
                </div>
              </div>
            </div>

            <div class="section-title">PROJECT SCOPE & PARAMETERS</div>
            <div class="grid">
              <div class="field">
                <div class="label">Investment Budget</div>
                <div class="value" style="color: #166534; font-weight: 700;">${budget || "Not Selected"}</div>
              </div>
              <div class="field">
                <div class="label">Target Timeline</div>
                <div class="value" style="color: #b45309; font-weight: 700;">${timeline || "Not Selected"}</div>
              </div>
              <div class="field">
                <div class="label font-bold">Number of Pages</div>
                <div class="value">${pages || "Not Selected"}</div>
              </div>
              <div class="field">
                <div class="label">Submission Date</div>
                <div class="value">${submissionDate}</div>
              </div>
            </div>

            <div class="field" style="margin-top: 15px;">
              <div class="label">Project Types Requested</div>
              <div>
                ${projectTypes.length > 0 
                  ? projectTypes.map((t: string) => `<span class="chip chip-type">${t}</span>`).join("")
                  : "<span class='value'>Not Specified</span>"
                }
              </div>
            </div>

            <div class="field" style="margin-top: 15px;">
              <div class="label">Required Integrations & Features</div>
              <div>
                ${requiredFeatures.length > 0 
                  ? requiredFeatures.map((f: string) => `<span class="chip">${f}</span>`).join("")
                  : "<span class='value'>Not Specified</span>"
                }
              </div>
            </div>

            <div class="field" style="margin-top: 15px;">
              <div class="label">Brand Styles Preferred</div>
              <div>
                ${brandStyle.length > 0 
                  ? brandStyle.map((s: string) => `<span class="chip chip-style">${s}</span>`).join("")
                  : "<span class='value'>Not Specified</span>"
                }
              </div>
            </div>

            <div class="section-title">PROJECT OBJECTIVES</div>
            <div class="field">
              <div class="value-block">${objectives}</div>
            </div>

            ${referenceWebsites ? `
              <div class="section-title">REFERENCE WEBSITES</div>
              <div class="field">
                <div class="value-block">${referenceWebsites}</div>
              </div>
            ` : ""}

            ${additionalNotes ? `
              <div class="section-title">ADDITIONAL NOTES / REQUIREMENTS</div>
              <div class="field">
                <div class="value-block">${additionalNotes}</div>
              </div>
            ` : ""}

            ${files.length > 0 ? `
              <div class="section-title">ATTACHMENTS (${files.length})</div>
              <ul style="padding-left: 20px; margin: 0; font-size: 13px;">
                ${files.map((f: any) => `<li><strong>${f.name}</strong> (${(f.size / (1024 * 1024)).toFixed(2)} MB)</li>`).join("")}
              </ul>
            ` : ""}

            <div class="section-title">METADATA</div>
            <div class="grid">
              <div class="field">
                <div class="label">User Browser</div>
                <div class="value" style="font-size: 12px; color: #64748b;">${browser}</div>
              </div>
              <div class="field">
                <div class="label">User Device</div>
                <div class="value" style="font-size: 12px; color: #64748b;">${device}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            This is an automated project discovery submission compiled by <a href="https://ai.studio/build">Nexora Studio Build</a>.
          </div>
        </div>
      </body>
      </html>
    `;

    // Initialize Mail Transport
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      console.log(`[SMTP] Initializing mail transport to host: ${SMTP_HOST}`);
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || "587"),
        secure: parseInt(SMTP_PORT || "587") === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      });

      const attachmentsList = files.map((f: any) => {
        // Base64 regex clean
        const base64Data = f.data.split(",")[1] || f.data;
        return {
          filename: f.name,
          content: base64Data,
          encoding: "base64",
          contentType: f.type
        };
      });

      console.log(`[SMTP] Sending project discovery email for ${name} to nexorastudio360@gmail.com`);
      await transporter.sendMail({
        from: SMTP_FROM_EMAIL || `"Nexora Discovery" <${SMTP_USER}>`,
        to: "nexorastudio360@gmail.com",
        subject: `🔥 [Inquiry] ${company || name} - ${industry} - Budget: ${budget}`,
        html: htmlEmail,
        attachments: attachmentsList
      });

      console.log(`[SMTP] Email sent successfully to nexorastudio360@gmail.com`);
    } else {
      console.log("==========================================================================");
      console.log("⚠️  [SMTP WARNING] No SMTP environment variables configured in workspace.");
      console.log("We have successfully received the project discovery inquiry on the backend.");
      console.log(`Client Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Budget: ${budget}`);
      console.log(`Industry: ${industry}`);
      console.log(`Attachments: ${files.length} file(s) attached.`);
      console.log("Check out the structured HTML email that would have been dispatched below:");
      console.log(htmlEmail.substring(0, 1000) + "\n... [Truncated for Console log output] ...");
      console.log("==========================================================================");
    }

    return res.status(200).json({
      success: true,
      message: "Project Discovery Intake received successfully on Server and dispatched!"
    });
  } catch (error: any) {
    console.error("[ERROR] Failed to process inquiry in API:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "An unexpected error occurred while processing your discovery intake."
    });
  }
});

// Setup development dev server / static server routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    console.log("[DEV] Initializing Vite development server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);
    console.log("[DEV] Vite development server middleware mounted successfully.");
  } else {
    // Production Mode
    console.log("[PROD] Initializing static asset delivery from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[PROD] Static assets mapped successfully.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 [SERVER] Nexora Studio running on http://localhost:${PORT}`);
    console.log(`🚀 [SERVER] Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer().catch((err) => {
  console.error("🛑 [FATAL] Failed to start Express server:", err);
});
