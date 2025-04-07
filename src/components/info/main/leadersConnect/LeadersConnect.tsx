import styles from "./LeadersConnect.module.scss";

interface LeadersConnectProps {
  data: {
    title: string;
    video: string;
  };
}

export default function LeadersConnect({ data }: LeadersConnectProps) {
  return (
    <div className={styles["leaders-connect"]}>
      <h2>{data.title}</h2>
      <iframe
        src={data.video}
        allow="autoplay; encrypted-media"
        title="Conrad Sangma Rally"
      />
    </div>
  );
}
