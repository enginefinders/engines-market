import {
  FaBolt,
  FaChartLine,
  FaClock,
  FaCogs,
  FaExclamationTriangle,
  FaHistory,
  FaInfoCircle,
  FaLink,
  FaTachometerAlt,
  FaUserShield,
} from "react-icons/fa";
import riskStyles from "./RiskAnalysis.module.css";

type RiskItem = {
  title: string;
  description: string;
  metaLabel: "Additional cost" | "Mitigation";
  metaValue: string;
};

const usedRisks: RiskItem[] = [
  {
    title: "Timing chain wear",
    description: "Not visible externally - may fail shortly after installation.",
    metaLabel: "Additional cost",
    metaValue: "£650 - £2,500",
  },
  {
    title: "Unknown service history",
    description: "Previous owner may have neglected oil changes - bearing wear hidden.",
    metaLabel: "Additional cost",
    metaValue: "£1,500 - £5,600+",
  },
  {
    title: "Turbo degradation",
    description: "Common failure point post-80k miles - often not tested.",
    metaLabel: "Additional cost",
    metaValue: "£800 - £2,500",
  },
  {
    title: "Injector wear",
    description: "Not diagnosed on basic inspection - leads to poor running.",
    metaLabel: "Additional cost",
    metaValue: "£300 - £1,500",
  },
  {
    title: "Matching-numbers lost",
    description: "Irreversible - affects vehicle value and authenticity.",
    metaLabel: "Additional cost",
    metaValue: "Varies by vehicle",
  },
];

const rebuiltRisks: RiskItem[] = [
  {
    title: "Extended downtime",
    description: "Vehicle off-road 1-3 weeks - may require alternative transport.",
    metaLabel: "Mitigation",
    metaValue: "Plan ahead; hire vehicle if needed",
  },
  {
    title: "Specialist quality",
    description: "Rebuild quality varies by workshop.",
    metaLabel: "Mitigation",
    metaValue: "Use vetted specialists only",
  },
  {
    title: "Parts availability",
    description: "Some components may be on backorder.",
    metaLabel: "Mitigation",
    metaValue: "Confirm parts availability before committing",
  },
  {
    title: "Cost escalation",
    description: "Additional issues may be discovered during strip-down.",
    metaLabel: "Mitigation",
    metaValue: "Budget 10-20% contingency",
  },
];

function RiskItemIcon({ title }: { title: string }) {
  if (/timing/i.test(title)) return <FaClock />;
  if (/service history/i.test(title)) return <FaHistory />;
  if (/turbo/i.test(title)) return <FaTachometerAlt />;
  if (/injector/i.test(title)) return <FaBolt />;
  if (/matching/i.test(title)) return <FaLink />;
  if (/downtime/i.test(title)) return <FaClock />;
  if (/specialist/i.test(title)) return <FaUserShield />;
  if (/parts availability/i.test(title)) return <FaCogs />;
  if (/cost escalation/i.test(title)) return <FaChartLine />;
  return <FaExclamationTriangle />;
}

function RiskColumn({
  type,
  title,
  items,
}: {
  type: "used" | "rebuilt";
  title: string;
  items: RiskItem[];
}) {
  return (
    <article className={`${riskStyles.riskColumn} ${riskStyles[type]}`}>
      <h3 className={riskStyles.columnHeading}>
        <FaExclamationTriangle aria-hidden="true" />
        <span>{title}</span>
      </h3>

      <div className={riskStyles.riskRows}>
        {items.map((item) => (
          <div className={riskStyles.riskRow} key={item.title}>
            <span className={riskStyles.iconCircle} aria-hidden="true">
              <RiskItemIcon title={item.title} />
            </span>

            <div className={riskStyles.riskBody}>
              <b>{item.title}</b>
              <p>{item.description}</p>
              <div className={riskStyles.riskMeta}>
                <strong>{item.metaLabel}:</strong>
                <span>{item.metaValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function RiskAnalysis() {
  return (
    <section className={riskStyles.riskSection} aria-labelledby="risk-analysis-heading">
      <div className={riskStyles.sectionHeading}>
        <p>RISK ANALYSIS - WHAT USERS DON'T SEE ELSEWHERE</p>
        <h2 id="risk-analysis-heading">
          Hidden risks of <span>used</span> engines <em>vs</em> risks of <strong>rebuilt</strong> engines
        </h2>
      </div>

      <div className={riskStyles.riskBoard}>
        <RiskColumn type="used" title="Hidden Risks of Used Engines" items={usedRisks} />

        <div className={riskStyles.divider} aria-hidden="true">
          <span>VS</span>
        </div>

        <RiskColumn type="rebuilt" title="Risks of Rebuilt Engines" items={rebuiltRisks} />
      </div>

      <div className={riskStyles.observedNote}>
        <FaInfoCircle aria-hidden="true" />
        <p>
          <b>[EM-OBSERVED]</b> based on post-installation survey data from 100+ customers 3-6 months after replacement.
        </p>
      </div>
    </section>
  );
}
