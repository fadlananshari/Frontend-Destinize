const ButtonCustom = ({ link, nama, bgColor }) => {
  return (
    <button className={`bg-${bgColor} py-2 text-white rounded-lg mb-5`}>
      <a href={link} className="px-4">{nama}</a>
    </button>
  );
};

export default ButtonCustom;
