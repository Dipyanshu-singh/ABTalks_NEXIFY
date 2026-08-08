import "./StatCard.css";

export default function StatCard({
    title,
    value,
    color,
}) {

    return (

        <div
            className="stat-card"
            style={{
                borderTop: `5px solid ${color}`,
            }}
        >

            <h4>{title}</h4>

            <h1>{value}</h1>

        </div>

    );

}