// Usage: node update-portfolio.js src/App.jsx
const fs = require("fs");
const file = process.argv[2] || "src/App.jsx";
let code = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak", code); // backup of your original

const edits = [
  // --- AI assistant system prompt ---
  [String.raw`- Currently pursuing a Bachelor's in Business Intelligence & Big Data`,
   String.raw`- Currently pursuing a Master's in Embedded Artificial Intelligence
- Licence (Bachelor's) in Business Intelligence & Big Data, completed in 2026
- Worked as a Software Developer from July to September 2026`],
  [String.raw`- Open to: freelance projects, internships, full-time opportunities`,
   String.raw`- Open to: freelance projects, remote jobs, internships, full-time opportunities`],

  // --- chatbot replies ---
  [String.raw`She's currently pursuing a Licence in Business Intelligence & Big Data, holds a Diplôme in Digital Development (OFPPT, 2025), and speaks Arabic, English, and French.`,
   String.raw`She holds a Licence in Business Intelligence & Big Data, is currently pursuing a Master's in Embedded Artificial Intelligence, completed a Diplôme in Digital Development (OFPPT, 2025), and speaks Arabic, English, and French.`],
  [String.raw`**2026 – In Progress:** Licence in Business Intelligence & Big Data\n**2025:**`,
   String.raw`**2026 – In Progress:** Master in Embedded Artificial Intelligence\n**2026:** Licence in Business Intelligence & Big Data\n**2025:**`],
  [String.raw`- Freelance projects\n- Internships\n- Full-time positions`,
   String.raw`- Freelance projects\n- Remote jobs\n- Internships\n- Full-time positions`],

  // --- About section ---
  [String.raw`Pursuing Licence in Business Intelligence &amp; Big Data`,
   String.raw`Pursuing Master's in Embedded Artificial Intelligence`],
  [String.raw`<li className="edu-item"><span className="edu-year">2026 – In Progress</span>Licence — Business Intelligence &amp; Big Data</li>`,
   String.raw`<li className="edu-item"><span className="edu-year">2026 – In Progress</span>Master — Embedded Artificial Intelligence</li>
                  <li className="edu-item"><span className="edu-year">2026</span>Licence — Business Intelligence &amp; Big Data</li>`],
  // Experience block (added right after the education list)
  [String.raw`<li className="edu-item"><span className="edu-year">2022</span>Baccalauréat — Sciences Physiques, option Française</li>`,
   String.raw`<li className="edu-item"><span className="edu-year">2022</span>Baccalauréat — Sciences Physiques, option Française</li>
                </ul>
                <div className="info-label" style={{ margin: "1.5rem 0 0.75rem" }}>Experience</div>
                <ul className="edu-list">
                  <li className="edu-item"><span className="edu-year">Jul – Sep 2026</span>Software Developer</li>
                  <li className="edu-item"><span className="edu-year">Jul – Aug 2024</span>Web Development Internship — Affairino, Agadir</li>`],

  // --- Contact ---
  [String.raw`Open to freelance projects, internships, and full-time opportunities.`,
   String.raw`Open to freelance projects, remote jobs, and full-time opportunities.`],
];

let failed = 0;
for (const [find, rep] of edits) {
  const n = code.split(find).length - 1;
  if (n !== 1) { console.log(`✗ NOT applied (found ${n}x): ${find.slice(0, 70)}…`); failed++; continue; }
  code = code.replace(find, () => rep);
  console.log("✓ " + find.slice(0, 60).replace(/\n/g, " ") + "…");
}
fs.writeFileSync(file, code);
console.log(failed ? `\nDone with ${failed} problem(s). Send me the ✗ lines.` : "\nAll edits applied. Original saved as " + file + ".bak");
