import type { FailureSourceDetails as FailureSourceDetailsData } from "@/data/failureSourceDetails";
import styles from "./FailureSourceDetails.module.css";

export default function FailureSourceDetails({ details, guideName, hideFaqs = false }: { details: FailureSourceDetailsData; guideName: string; hideFaqs?: boolean }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.pill}>COMPLETE ORIGINAL GUIDE DATA</span>
        <h2>In-Depth <span>{guideName}</span> Information</h2>
        <p className={styles.intro}>Page-specific diagnosis, cost, decision and safety information extracted from the original static guide.</p>

        <div className={styles.accordion}>
          {details.sections.map((section, index) => (
            <details key={`${section.title}-${index}`} open={index === 0}>
              <summary>{section.title}<span>+</span></summary>
              <div className={styles.body}>
                {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                {section.additionalText && !section.paragraphs.includes(section.additionalText) ? <p>{section.additionalText}</p> : null}
                {section.bullets.length ? <ul>{section.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul> : null}
                {section.tables.map((table, tableIndex) => (
                  <div className={styles.tableScroll} key={tableIndex}>
                    <table>
                      <thead><tr>{table.headers.map((header, headerIndex) => <th key={headerIndex}>{header}</th>)}</tr></thead>
                      <tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

        {!hideFaqs && details.faqs.length ? <div className={styles.faq}><h3>Common Questions Answered</h3>{details.faqs.map((item, index) => <details key={`${item.question}-${index}`}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div> : null}
      </div>
    </section>
  );
}
