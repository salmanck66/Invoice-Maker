import "./App.css";
import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  Printer,
  ArrowLeft,
  Package,
  Save,
  FileText,
  X,
  Settings,
  Building2,
  Palette,
  Type,
  Image,
  CheckCircle,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  companyName: "Everwood Interior",
  address: "Areacode, Malappuram, Kerala 673639",
  phone: "7994309215",
  email: "",
  gstin: "",
  logoUrl:
    "https://i.postimg.cc/4NVHg0rD/Whats-App-Image-2026-03-04-at-11-39-52-PM.jpg",
  headerBg: "#1a3a2a",
  headerText: "#c9a84c",
  accentBg: "#2c6e49",
  accentText: "#ffffff",
  sectionBg: "#e8f4ed",
  sectionText: "#1a3a2a",
  totalBg: "#f0f8f2",
  font: "Georgia, serif",
  footerText: "Thank you for choosing Everwood Interior",
  currency: "₹",
};

const FONT_OPTIONS = [
  { label: "Georgia (Serif)", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
];

const genId = () => Math.random().toString(36).substr(2, 9);
const fmtNum = (val) =>
  (parseFloat(val) || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const emptySection = () => ({
  id: genId(),
  name: "",
  items: [{ id: genId(), name: "", qty: 1, price: "" }],
  sectionTotal: "",
});
const emptyInvoice = () => ({
  id: genId(),
  number: "",
  date: new Date().toISOString().split("T")[0],
  billTo: "",
  billAddress: "",
  sections: [emptySection()],
  lineItems: [{ id: genId(), name: "", qty: 1, price: "" }],
  notes: "",
  createdAt: Date.now(),
});
const calcGrand = (inv) => {
  const sec = inv.sections.reduce(
    (s, sec) => s + (parseFloat(sec.sectionTotal) || 0),
    0,
  );
  const li = inv.lineItems.reduce(
    (s, it) => s + (parseFloat(it.price) || 0) * (parseFloat(it.qty) || 1),
    0,
  );
  return sec + li;
};

// ─── SETTINGS ────────────────────────────────────────────────
function SettingsPanel({ settings, onSave, onCancel }) {
  const [s, setS] = useState({ ...settings });
  const [tab, setTab] = useState("company");
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const handleSave = () => {
    onSave(s);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "company", label: "Company", icon: <Building2 size={14} /> },
    { id: "colors", label: "Colors", icon: <Palette size={14} /> },
    { id: "font", label: "Font", icon: <Type size={14} /> },
    { id: "logo", label: "Logo", icon: <Image size={14} /> },
  ];

  const ColorRow = ({ label, k }) => (
    <div className="color-row">
      <input
        type="color"
        value={s[k]}
        onChange={(e) => set(k, e.target.value)}
        style={{
          width: 44,
          height: 36,
          border: "2px solid #e8dfc8",
          borderRadius: 6,
          cursor: "pointer",
          padding: 2,
        }}
      />
      <div style={{ flex: 1 }}>
        <label className="lbl" style={{ marginBottom: 2 }}>
          {label}
        </label>
        <input
          className="inp"
          style={{ fontSize: 12, fontFamily: "monospace" }}
          value={s[k]}
          onChange={(e) => set(k, e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="page-bg">
      <div className="container-sm">
        <div className="topbar-row">
          <button onClick={onCancel} className="btn btn-brown">
            <ArrowLeft size={14} /> Back
          </button>
          <h2 className="topbar-title">⚙️ Settings</h2>
          <button
            onClick={handleSave}
            className={`btn ${saved ? "btn-saved" : "btn-dark"}`}
          >
            {saved ? (
              <>
                <CheckCircle size={14} /> Saved!
              </>
            ) : (
              <>
                <Save size={14} /> Save
              </>
            )}
          </button>
        </div>

        <div className="settings-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="settings-tab"
              style={{
                background: tab === t.id ? "#1a3a2a" : "transparent",
                color: tab === t.id ? "#c9a84c" : "#6b5c3e",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === "company" && (
          <div className="card">
            <h3 className="section-head">Company Information</h3>
            {[
              {
                label: "Company Name",
                k: "companyName",
                ph: "Your business name",
              },
              { label: "Address", k: "address", ph: "City, State, Pincode" },
              { label: "Phone", k: "phone", ph: "Phone number" },
              {
                label: "Email (optional)",
                k: "email",
                ph: "email@example.com",
              },
              { label: "GSTIN (optional)", k: "gstin", ph: "22AAAAA0000A1Z5" },
              { label: "Currency Symbol", k: "currency", ph: "₹" },
              {
                label: "Invoice Footer Text",
                k: "footerText",
                ph: "Thank you message",
              },
            ].map(({ label, k, ph }) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <label className="lbl">{label}</label>
                <input
                  className="inp"
                  value={s[k]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={ph}
                />
              </div>
            ))}
          </div>
        )}

        {tab === "colors" && (
          <div className="card">
            <h3 className="section-head">Bill Colors</h3>
            <ColorRow label="Header Background" k="headerBg" />
            <ColorRow label="Header Accent / Text" k="headerText" />
            <ColorRow label="Table Header Background" k="accentBg" />
            <ColorRow label="Table Header Text" k="accentText" />
            <ColorRow label="Section Row Background" k="sectionBg" />
            <ColorRow label="Section Row Text" k="sectionText" />
            <ColorRow label="Sub-total Row Background" k="totalBg" />

            <div
              style={{
                marginTop: 20,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <div
                style={{
                  background: s.headerBg,
                  color: s.headerText,
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                ▌ {s.companyName} — Live Preview
              </div>
              <div
                style={{
                  background: s.accentBg,
                  color: s.accentText,
                  padding: "8px 16px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                ITEM &nbsp;&nbsp; QTY &nbsp;&nbsp; PRICE &nbsp;&nbsp; AMOUNT
              </div>
              <div
                style={{
                  background: s.sectionBg,
                  color: s.sectionText,
                  padding: "8px 16px",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                Kitchen Materials
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  fontSize: 12,
                  background: "#fafafa",
                }}
              >
                &nbsp; Multiwood 0.8 density
              </div>
              <div
                style={{
                  background: s.totalBg,
                  padding: "8px 16px",
                  fontWeight: 700,
                  fontSize: 13,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Sub-total</span>
                <span>{s.currency} 3,25,000.00</span>
              </div>
              <div
                style={{
                  background: s.headerBg,
                  color: s.headerText,
                  padding: "10px 16px",
                  fontWeight: 700,
                  fontSize: 13,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Amount Due</span>
                <span>{s.currency} 10,18,000.00</span>
              </div>
            </div>
          </div>
        )}

        {tab === "font" && (
          <div className="card">
            <h3 className="section-head">Invoice Font</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {FONT_OPTIONS.map((f) => (
                <label
                  key={f.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    border: `2px solid ${s.font === f.value ? "#2c6e49" : "#e8dfc8"}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    background: s.font === f.value ? "#e8f4ed" : "#fff",
                  }}
                >
                  <input
                    type="radio"
                    name="font"
                    value={f.value}
                    checked={s.font === f.value}
                    onChange={(e) => set("font", e.target.value)}
                    style={{ accentColor: "#2c6e49" }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: f.value,
                        fontSize: 15,
                        color: "#1a3a2a",
                      }}
                    >
                      Everwood Interior — {f.label}
                    </div>
                    <div
                      style={{
                        fontFamily: f.value,
                        fontSize: 12,
                        color: "#888",
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {tab === "logo" && (
          <div className="card">
            <h3 className="section-head">Company Logo</h3>
            <label className="lbl">Logo Image URL</label>
            <input
              className="inp"
              style={{ marginBottom: 12 }}
              value={s.logoUrl}
              onChange={(e) => set("logoUrl", e.target.value)}
              placeholder="https://i.postimg.cc/..."
            />
            <p
              style={{
                fontSize: 12,
                color: "#888",
                margin: "0 0 20px",
                lineHeight: 1.6,
              }}
            >
              Upload your logo to <strong>postimages.org</strong> or{" "}
              <strong>imgbb.com</strong> and paste the direct link (ending in
              .jpg or .png).
            </p>
            {s.logoUrl && (
              <div style={{ textAlign: "center" }}>
                <label className="lbl" style={{ textAlign: "center" }}>
                  Preview
                </label>
                <div
                  style={{
                    display: "inline-block",
                    background: s.headerBg,
                    padding: 12,
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={s.logoUrl}
                    alt="Logo preview"
                    className="logo-circle logo-lg"
                    style={{
                      border: `3px solid ${s.headerText}`,
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.alt = "⚠️ Could not load — check the URL";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleSave}
            className={`btn ${saved ? "btn-saved" : "btn-dark"}`}
          >
            {saved ? (
              <>
                <CheckCircle size={14} /> Saved!
              </>
            ) : (
              <>
                <Save size={14} /> Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── INVOICE PREVIEW ─────────────────────────────────────────
function InvoicePreview({ invoice, settings: S, onBack, onEdit }) {
  const grand = calcGrand(invoice);
  return (
    <div className="page-bg" style={{ fontFamily: S.font }}>
      <div className="preview-actions">
        <button onClick={onBack} className="btn btn-brown">
          <ArrowLeft size={15} /> Back
        </button>
        <div className="preview-right-btns">
          <button onClick={onEdit} className="btn btn-green">
            <Edit3 size={15} /> Edit
          </button>
          <button onClick={() => window.print()} className="btn btn-dark">
            <Printer size={15} /> Print / PDF
          </button>
        </div>
      </div>

      <div
        id="print-area"
        className="preview-wrapper"
        style={{ fontFamily: S.font }}
      >
        {/* Header */}
        <div
          className="preview-header"
          style={{ background: S.headerBg, color: "#fff" }}
        >
          {S.logoUrl && (
            <img
              src={S.logoUrl}
              alt="Logo"
              className="logo-circle logo-lg"
              style={{ border: `3px solid ${S.headerText}` }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <div className="preview-company">
            <h1 style={{ color: S.headerText }}>{S.companyName}</h1>
            <p>
              {S.address}
              {S.phone ? ` | ${S.phone}` : ""}
              {S.email ? ` | ${S.email}` : ""}
            </p>
            {S.gstin && (
              <p style={{ margin: "2px 0 0", fontSize: 11, opacity: 0.7 }}>
                GSTIN: {S.gstin}
              </p>
            )}
          </div>
          <div className="preview-inv-num">
            <div className="preview-inv-label">Invoice</div>
            <div className="preview-inv-no" style={{ color: S.headerText }}>
              #{invoice.number}
            </div>
            <div className="preview-inv-date">
              {new Date(invoice.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="preview-billto">
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: "#6b5c3e",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Bill To
          </div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{invoice.billTo}</div>
          {invoice.billAddress && (
            <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>
              {invoice.billAddress}
            </div>
          )}
        </div>

        {/* Table Header */}
        <div
          className="inv-table-head"
          style={{ background: S.accentBg, color: S.accentText }}
        >
          <span>Item</span>
          <span style={{ textAlign: "center" }}>Qty</span>
          <span style={{ textAlign: "right" }}>Price</span>
          <span style={{ textAlign: "right" }}>Amount</span>
        </div>

        {/* Sections */}
        {invoice.sections.map((sec, si) => (
          <div key={sec.id}>
            {sec.name && (
              <div
                className="inv-section-head-row"
                style={{ background: S.sectionBg, color: S.sectionText }}
              >
                {sec.name}
              </div>
            )}
            {sec.items
              .filter((it) => it.name)
              .map((it, ii) => {
                const hasPrice = it.price !== "" && parseFloat(it.price) > 0;
                const amt = hasPrice
                  ? (parseFloat(it.price) || 0) * (parseFloat(it.qty) || 1)
                  : null;
                return (
                  <div
                    key={it.id}
                    className="inv-table-row"
                    style={{ background: ii % 2 === 0 ? "#fdfcfa" : "#fff" }}
                  >
                    <span style={{ paddingLeft: 8, color: "#333" }}>
                      {it.name}
                    </span>
                    <span style={{ textAlign: "center", color: "#555" }}>
                      {it.qty}
                    </span>
                    <span
                      style={{
                        textAlign: "right",
                        color: hasPrice ? "#555" : "#ccc",
                      }}
                    >
                      {hasPrice ? fmtNum(it.price) : "–"}
                    </span>
                    <span
                      style={{
                        textAlign: "right",
                        color: hasPrice ? "#444" : "#ccc",
                      }}
                    >
                      {amt !== null ? fmtNum(amt) : "–"}
                    </span>
                  </div>
                );
              })}
            {sec.sectionTotal && (
              <div
                className="inv-subtotal-row"
                style={{ background: S.totalBg }}
              >
                <span style={{ color: S.sectionText }}>
                  Sub-total — {sec.name || `Section ${si + 1}`}
                </span>
                <span />
                <span />
                <span style={{ textAlign: "right", color: S.sectionText }}>
                  {fmtNum(sec.sectionTotal)}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Line Items */}
        {invoice.lineItems
          .filter((it) => it.name)
          .map((it, ii) => {
            const amt = (parseFloat(it.price) || 0) * (parseFloat(it.qty) || 1);
            return (
              <div
                key={it.id}
                className="inv-line-row"
                style={{ background: ii % 2 === 0 ? "#fffdf7" : "#fff8ef" }}
              >
                <span>{it.name}</span>
                <span style={{ textAlign: "center" }}>{it.qty}</span>
                <span style={{ textAlign: "right" }}>{fmtNum(it.price)}</span>
                <span style={{ textAlign: "right" }}>{fmtNum(amt)}</span>
              </div>
            );
          })}

        {/* Totals */}
        <div className="preview-totals">
          <div className="preview-totals-inner">
            {[
              ["Subtotal", grand],
              ["Total", grand],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid #e8dfc8",
                  fontSize: 13,
                  color: "#444",
                }}
              >
                <span>{l}</span>
                <span style={{ fontWeight: 600 }}>
                  {S.currency} {fmtNum(v)}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                background: S.headerBg,
                color: S.headerText,
                borderRadius: 6,
                marginTop: 10,
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              <span>Amount Due</span>
              <span>
                {S.currency} {fmtNum(grand)}
              </span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="preview-notes">
            <strong>Notes:</strong> {invoice.notes}
          </div>
        )}
        <div
          style={{
            background: S.headerBg,
            color: S.headerText,
            textAlign: "center",
            padding: "11px",
            fontSize: 12,
            opacity: 0.9,
          }}
        >
          {S.footerText}
        </div>
      </div>
    </div>
  );
}

// ─── INVOICE EDITOR ──────────────────────────────────────────
function InvoiceEditor({ initial, settings: S, onSave, onCancel }) {
  const [inv, setInv] = useState(() =>
    initial ? JSON.parse(JSON.stringify(initial)) : emptyInvoice(),
  );
  const setField = (k, v) => setInv((p) => ({ ...p, [k]: v }));
  const addSection = () =>
    setInv((p) => ({ ...p, sections: [...p.sections, emptySection()] }));
  const removeSection = (si) =>
    setInv((p) => ({ ...p, sections: p.sections.filter((_, i) => i !== si) }));
  const setSectionField = (si, k, v) =>
    setInv((p) => {
      const s = [...p.sections];
      s[si] = { ...s[si], [k]: v };
      return { ...p, sections: s };
    });
  const addSectionItem = (si) =>
    setInv((p) => {
      const s = [...p.sections];
      s[si] = {
        ...s[si],
        items: [...s[si].items, { id: genId(), name: "", qty: 1, price: "" }],
      };
      return { ...p, sections: s };
    });
  const removeSectionItem = (si, ii) =>
    setInv((p) => {
      const s = [...p.sections];
      s[si] = { ...s[si], items: s[si].items.filter((_, i) => i !== ii) };
      return { ...p, sections: s };
    });
  const setSectionItem = (si, ii, k, v) =>
    setInv((p) => {
      const s = [...p.sections];
      const items = [...s[si].items];
      items[ii] = { ...items[ii], [k]: v };
      s[si] = { ...s[si], items };
      return { ...p, sections: s };
    });
  const addLineItem = () =>
    setInv((p) => ({
      ...p,
      lineItems: [...p.lineItems, { id: genId(), name: "", qty: 1, price: "" }],
    }));
  const removeLineItem = (i) =>
    setInv((p) => ({
      ...p,
      lineItems: p.lineItems.filter((_, idx) => idx !== i),
    }));
  const setLineItem = (i, k, v) =>
    setInv((p) => {
      const li = [...p.lineItems];
      li[i] = { ...li[i], [k]: v };
      return { ...p, lineItems: li };
    });
  const grand = calcGrand(inv);

  return (
    <div className="page-bg">
      <div className="container-md">
        <div className="topbar-row">
          <button onClick={onCancel} className="btn btn-brown">
            <ArrowLeft size={14} /> Cancel
          </button>
          <h2 className="topbar-title" style={{ fontFamily: S.font }}>
            {initial ? "Edit Invoice" : "New Invoice"}
          </h2>
          <button onClick={() => onSave(inv)} className="btn btn-dark">
            <Save size={14} /> Save
          </button>
        </div>

        {/* Invoice Details */}
        <div className="card">
          <h3 className="section-head">Invoice Details</h3>
          <div className="detail-grid-3">
            <div>
              <label className="lbl">Invoice #</label>
              <input
                className="inp"
                value={inv.number}
                onChange={(e) => setField("number", e.target.value)}
                placeholder="441"
              />
            </div>
            <div>
              <label className="lbl">Date</label>
              <input
                type="date"
                className="inp"
                value={inv.date}
                onChange={(e) => setField("date", e.target.value)}
              />
            </div>
            <div>
              <label className="lbl">Bill To</label>
              <input
                className="inp"
                value={inv.billTo}
                onChange={(e) => setField("billTo", e.target.value)}
                placeholder="Client / Site name"
              />
            </div>
          </div>
          <div className="detail-grid-2">
            <div>
              <label className="lbl">Client Address (optional)</label>
              <input
                className="inp"
                value={inv.billAddress || ""}
                onChange={(e) => setField("billAddress", e.target.value)}
                placeholder="Address"
              />
            </div>
            <div>
              <label className="lbl">Notes (optional)</label>
              <input
                className="inp"
                value={inv.notes || ""}
                onChange={(e) => setField("notes", e.target.value)}
                placeholder="Payment terms, remarks..."
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        {inv.sections.map((sec, si) => (
          <div
            key={sec.id}
            className="card"
            style={{ borderLeft: `4px solid ${S.accentBg}` }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <Package size={16} color={S.accentBg} />
              <input
                className="inp"
                style={{ fontWeight: 700, fontSize: 14, flex: 1 }}
                value={sec.name}
                onChange={(e) => setSectionField(si, "name", e.target.value)}
                placeholder="Section name (e.g. Kitchen Materials)"
              />
              <button
                onClick={() => removeSection(si)}
                className="icon-btn"
                style={{ background: "#fee" }}
              >
                <Trash2 size={14} color="#c0392b" />
              </button>
            </div>
            <div
              style={{
                background: "#f9f7f0",
                borderRadius: 6,
                padding: "10px 10px 8px",
                marginBottom: 10,
              }}
            >
              <div className="item-header">
                <span className="col-label">ITEM NAME</span>
                <span className="col-label">QTY</span>
                <span className="col-label">
                  PRICE {S.currency}{" "}
                  <span style={{ fontWeight: 400, color: "#bbb" }}>(opt)</span>
                </span>
                <span />
              </div>
              {sec.items.map((it, ii) => (
                <div key={it.id} className="item-row">
                  <input
                    className="inp"
                    value={it.name}
                    onChange={(e) =>
                      setSectionItem(si, ii, "name", e.target.value)
                    }
                    placeholder="Item name"
                  />
                  <input
                    className="inp"
                    style={{ textAlign: "center" }}
                    type="number"
                    value={it.qty}
                    onChange={(e) =>
                      setSectionItem(si, ii, "qty", e.target.value)
                    }
                    min={1}
                  />
                  <input
                    className="inp"
                    style={{ textAlign: "right" }}
                    type="number"
                    value={it.price}
                    onChange={(e) =>
                      setSectionItem(si, ii, "price", e.target.value)
                    }
                    placeholder="N/A"
                  />
                  <button
                    onClick={() => removeSectionItem(si, ii)}
                    className="icon-btn"
                    style={{ background: "#fee" }}
                  >
                    <X size={13} color="#c0392b" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSectionItem(si)}
                className="btn"
                style={{
                  background: "#e8f4ed",
                  color: S.accentBg,
                  fontSize: 12,
                  padding: "5px 10px",
                }}
              >
                <Plus size={12} /> Add Item
              </button>
            </div>
            <div className="section-total-row">
              <label className="lbl">Section Total ({S.currency})</label>
              <input
                className="inp"
                style={{ maxWidth: 160, fontWeight: 700 }}
                type="number"
                value={sec.sectionTotal}
                onChange={(e) =>
                  setSectionField(si, "sectionTotal", e.target.value)
                }
                placeholder="0.00"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addSection}
          className="btn btn-full"
          style={{ background: S.accentBg, color: "#fff", marginBottom: 16 }}
        >
          <Plus size={14} /> Add Section
        </button>

        {/* Line Items */}
        <div className="card">
          <h3 className="section-head">Individual Items (with price)</h3>
          <div className="line-header">
            <span className="col-label">ITEM NAME</span>
            <span className="col-label">QTY</span>
            <span className="col-label">PRICE ({S.currency})</span>
            <span />
          </div>
          {inv.lineItems.map((it, i) => (
            <div key={it.id} className="line-row">
              <input
                className="inp"
                value={it.name}
                onChange={(e) => setLineItem(i, "name", e.target.value)}
                placeholder="e.g. Stair sitting"
              />
              <input
                className="inp"
                style={{ textAlign: "center" }}
                type="number"
                value={it.qty}
                onChange={(e) => setLineItem(i, "qty", e.target.value)}
                min={1}
              />
              <input
                className="inp"
                style={{ textAlign: "right" }}
                type="number"
                value={it.price}
                onChange={(e) => setLineItem(i, "price", e.target.value)}
                placeholder="0.00"
              />
              <button
                onClick={() => removeLineItem(i)}
                className="icon-btn"
                style={{ background: "#fee" }}
              >
                <X size={13} color="#c0392b" />
              </button>
            </div>
          ))}
          <button
            onClick={addLineItem}
            className="btn"
            style={{
              background: "#e8f4ed",
              color: S.accentBg,
              fontSize: 12,
              padding: "6px 12px",
            }}
          >
            <Plus size={12} /> Add Item
          </button>
        </div>

        {/* Grand Total */}
        <div
          className="grand-total-card"
          style={{
            background: S.headerBg,
            color: S.headerText,
            fontFamily: S.font,
          }}
        >
          <span>Grand Total</span>
          <span>
            {S.currency} {fmtNum(grand)}
          </span>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
        >
          <button onClick={() => onSave(inv)} className="btn btn-dark">
            <Save size={15} /> Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────
function Dashboard({
  invoices,
  settings: S,
  onCreate,
  onView,
  onEdit,
  onDelete,
  onSettings,
}) {
  return (
    <div style={{ background: "#f5f0e8", minHeight: "100vh" }}>
      {/* Navbar */}
      <div className="dash-nav" style={{ background: S.headerBg }}>
        {S.logoUrl && (
          <img
            src={S.logoUrl}
            alt="Logo"
            className="logo-circle logo-md"
            style={{
              border: `2px solid ${S.headerText}`,
              margin: "10px 0",
              flexShrink: 0,
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div className="dash-nav-title">
          <h1
            className="dash-nav-brand"
            style={{ color: S.headerText, fontFamily: S.font }}
          >
            {S.companyName}
          </h1>
          <p className="dash-nav-sub">Billing Management</p>
        </div>
        <div className="dash-nav-actions">
          <button
            onClick={onSettings}
            className="btn btn-ghost"
            style={{
              color: S.headerText,
              border: `1px solid ${S.headerText}55`,
            }}
          >
            <Settings size={14} />{" "}
            <span style={{ display: "none" }} className="btn-label">
              Settings
            </span>
          </button>
          <button
            onClick={onCreate}
            className="btn"
            style={{
              background: S.headerText,
              color: S.headerBg,
              fontWeight: 700,
            }}
          >
            <Plus size={15} /> New
          </button>
        </div>
      </div>

      <div className="container-lg" style={{ marginTop: 24, marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <h2 style={{ margin: 0, fontFamily: S.font, color: "#1a3a2a" }}>
            All Invoices
          </h2>
          <span
            style={{
              background: S.accentBg,
              color: S.accentText,
              borderRadius: 20,
              padding: "3px 14px",
              fontSize: 13,
            }}
          >
            {invoices.length} invoices
          </span>
        </div>

        {invoices.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} color="#c8b89a" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 18, fontFamily: S.font, color: "#6b5c3e" }}>
              No invoices yet
            </p>
            <p style={{ fontSize: 14, color: "#888" }}>
              Create your first invoice to get started
            </p>
            <button
              onClick={onCreate}
              className="btn"
              style={{ background: S.accentBg, color: "#fff", marginTop: 12 }}
            >
              <Plus size={14} /> Create Invoice
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {[...invoices]
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((inv) => {
                const grand = calcGrand(inv);
                return (
                  <div key={inv.id} className="inv-card">
                    <div
                      className="inv-icon"
                      style={{ background: S.sectionBg }}
                    >
                      <FileText size={20} color={S.accentBg} />
                    </div>
                    <div className="inv-info" onClick={() => onView(inv)}>
                      <div className="inv-name" style={{ fontFamily: S.font }}>
                        Invoice #{inv.number || "–"}
                      </div>
                      <div className="inv-meta">
                        {inv.billTo || "No client"} ·{" "}
                        {new Date(inv.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="inv-amount">
                      <div className="inv-total">
                        {S.currency} {fmtNum(grand)}
                      </div>
                      <div className="inv-due" style={{ color: S.accentBg }}>
                        AMOUNT DUE
                      </div>
                    </div>
                    <div className="inv-btns">
                      <button
                        onClick={() => onView(inv)}
                        className="icon-btn"
                        style={{ background: S.sectionBg }}
                        title="Preview"
                      >
                        <Eye size={15} color={S.accentBg} />
                      </button>
                      <button
                        onClick={() => onEdit(inv)}
                        className="icon-btn"
                        style={{ background: "#eef3ff" }}
                        title="Edit"
                      >
                        <Edit3 size={15} color="#2563eb" />
                      </button>
                      <button
                        onClick={() => onDelete(inv.id)}
                        className="icon-btn"
                        style={{ background: "#fee" }}
                        title="Delete"
                      >
                        <Trash2 size={15} color="#c0392b" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────
export default function App() {
  const [invoices, setInvoices] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [view, setView] = useState("dashboard");
  const [current, setCurrent] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const inv = localStorage.getItem("invoices");
      if (inv) setInvoices(JSON.parse(inv));
      const cfg = localStorage.getItem("settings");
      if (cfg) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(cfg) });
    } catch (_) {}
    setLoaded(true);
  }, []);

  const persistInvoices = useCallback((data) => {
    try {
      localStorage.setItem("invoices", JSON.stringify(data));
    } catch (_) {}
  }, []);

  const saveSettings = (s) => {
    setSettings(s);
    try {
      localStorage.setItem("settings", JSON.stringify(s));
    } catch (_) {}
  };

  const saveInvoice = (inv) => {
    setInvoices((prev) => {
      const exists = prev.find((i) => i.id === inv.id);
      const updated = exists
        ? prev.map((i) => (i.id === inv.id ? inv : i))
        : [...prev, inv];
      persistInvoices(updated);
      return updated;
    });
    setCurrent(inv);
    setView("preview");
  };

  const deleteInvoice = (id) => {
    if (!confirm("Delete this invoice?")) return;
    setInvoices((prev) => {
      const u = prev.filter((i) => i.id !== id);
      persistInvoices(u);
      return u;
    });
  };

  if (!loaded)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Georgia, serif",
          color: "#2c6e49",
          fontSize: 18,
        }}
      >
        Loading…
      </div>
    );

  if (view === "settings")
    return (
      <SettingsPanel
        settings={settings}
        onSave={(s) => {
          saveSettings(s);
          setView("dashboard");
        }}
        onCancel={() => setView("dashboard")}
      />
    );
  if (view === "editor")
    return (
      <InvoiceEditor
        initial={current}
        settings={settings}
        onSave={saveInvoice}
        onCancel={() => setView(current ? "preview" : "dashboard")}
      />
    );
  if (view === "preview" && current)
    return (
      <InvoicePreview
        invoice={current}
        settings={settings}
        onBack={() => setView("dashboard")}
        onEdit={() => setView("editor")}
      />
    );

  return (
    <Dashboard
      invoices={invoices}
      settings={settings}
      onCreate={() => {
        setCurrent(null);
        setView("editor");
      }}
      onView={(inv) => {
        setCurrent(inv);
        setView("preview");
      }}
      onEdit={(inv) => {
        setCurrent(inv);
        setView("editor");
      }}
      onDelete={deleteInvoice}
      onSettings={() => setView("settings")}
    />
  );
}
