import React from "react";

function ReviewDisplay({ jsonString }) {
  const data = JSON.parse(jsonString || "{}");

  return (
    <div className="review-container">
      <h2>Review Summary</h2>
      <p>
        <strong>Overall Impression:</strong> {data.overall_impression}
      </p>
      <p>
        <strong>Grammar:</strong> {data.grammar}
      </p>
      <p>
        <strong>Formatting:</strong> {data.formatting}
      </p>
      <p>
        <strong>Content:</strong> {data.content}
      </p>

      <h3>Bullet Points Suggestions</h3>
      <ul>
        {data.bullet_points_rephrase?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p>
        <strong>Areas of Improvement:</strong> {data.areas_of_improvement}
      </p>
    </div>
  );
}

export default ReviewDisplay;
