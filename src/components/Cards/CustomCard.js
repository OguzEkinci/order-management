const CustomCard = ({ order, onDrop }) => {
  return (
    <div className="p-4 bg-red-600 shadow rounded">
      <h3 className="text-md font-semibold">{order?.address}</h3>
      <p>Ödeme: {order?.payment}</p>
      <p>Teslimat Zamanı: {new Date(order?.delivery_time).toLocaleString()}</p>
      <div>
        {order?.items.map((item) => (
          <p key={item?.id}>{item?.name}</p>
        ))}
      </div>
    </div>
  );
};

export default CustomCard;
