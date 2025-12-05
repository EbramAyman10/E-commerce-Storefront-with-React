import "./productCard.css";
export default function RenderStars({rating}) {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="stars" >
      {[...Array(totalStars)].map((_, index) => (
        <i
          key={index}
          className={
            index < filledStars
              ? "fa-solid fa-star filled-star"
              : "fa-regular fa-star empty-star"
          }
        ></i>
      ))}
    </div>
  );
}
