import { useState, useEffect } from "react";

export default function PrintButton({
  data,
  columns,
  title,
  className = "btn btn-edit",
}) {
  const [printContent, setPrintContent] = useState(null);

  const handlePrint = () => {
    const headers = Object.values(columns)
      .map((header) => `<th>${header}</th>`)
      .join("");
    const dataKeys = Object.keys(columns);

    const rows = data
      .map((item) => {
        const cells = dataKeys
          .map((key) => `<td>${item[key] || ""}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    const tableHtml = `
            <div class="printable-container">
                <h1 class="print-title">${title}</h1>
                <table class="print-table">
                    <thead>
                        <tr>${headers}</tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;

    setPrintContent(tableHtml);
  };

  useEffect(() => {
    if (printContent) {
      window.print();
      setPrintContent(null);
    }
  }, [printContent]);

  return (
    <>
      <button className={className} onClick={handlePrint}>
        Imprimir
      </button>
      {/* Hidden div for printing. Using a 'ref' is an alternative, 
        but this state-based approach is simple and effective. */}
      {printContent && (
        <div dangerouslySetInnerHTML={{ __html: printContent }} />
      )}
    </>
  );
}
