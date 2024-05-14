import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import services from "../../services";
import classes from "./dndList.module.css";
import { IconPlus } from "@tabler/icons-react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [couriers, setCouriers] = useState([]);

  const { isLoading: isOrdersLoading, data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await services.orders().then((res) => res),
  });

  const { isLoading: isCouriersLoading, data: couriersData } = useQuery({
    queryKey: ["couriers"],
    queryFn: async () => await services.couriers().then((res) => res),
  });

  const { isLoading: isBasketsLoading, data: basketsData } = useQuery({
    queryKey: ["baskets"],
    queryFn: async () => await services.baskets().then((res) => res),
  });

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  useEffect(() => {
    if (basketsData) {
      setBaskets(basketsData);
    }
  }, [basketsData]);

  useEffect(() => {
    if (couriersData) {
      setCouriers(couriersData);
    }
  }, [couriersData]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (source.droppableId === destination.droppableId) {
      // Aynı sütunda sürükle bırak
      if (source.droppableId === "pending-orders") {
        const newOrders = [...orders];
        const [movedOrder] = newOrders.splice(sourceIndex, 1);
        newOrders.splice(destinationIndex, 0, movedOrder);
        setOrders(newOrders);
      }
    } else {
      // Farklı sütunlar arasında sürükle bırak
      if (
        source.droppableId === "pending-orders" &&
        destination.droppableId === "pending-baskets"
      ) {
        // Sepete sürükle bırak
        const movedOrder = orders[sourceIndex];
        const newBasket = {
          id: new Date().getTime().toString(),
          courier_id: null,
          status: "Hazırlanıyor",
          orders: [movedOrder.id],
        };
        setBaskets((prevBaskets) => [newBasket, ...prevBaskets]);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== movedOrder.id),
        );
      } else if (
        source.droppableId === "pending-baskets" &&
        destination.droppableId === "on-the-way-baskets"
      ) {
        // Sepeti Yoldaki Siparişler sütununa taşı
        const newBaskets = [...baskets];
        const [movedBasket] = newBaskets.splice(sourceIndex, 1);
        movedBasket.status = "Yolda";
        setBaskets([...newBaskets, movedBasket]);
      } else if (
        source.droppableId === "pending-baskets" &&
        destination.droppableId === "pending-baskets"
      ) {
        // Sepetin içine sürükle bırak
        const movedOrder = orders.find(
          (order) => order.id === orders[sourceIndex].id,
        );
        const updatedBaskets = baskets.map((basket) => {
          if (basket.id === destination.droppableId) {
            return {
              ...basket,
              orders: [...basket.orders, movedOrder.id],
            };
          }
          return basket;
        });
        setBaskets(updatedBaskets);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== movedOrder.id),
        );
      }
    }
  };
  const handleAssignCourier = (basketId, courierId) => {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) =>
        basket.id === basketId ? { ...basket, courier_id: courierId } : basket,
      ),
    );
  };

  const handleDeliveryStatus = (basketId, status) => {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) =>
        basket.id === basketId ? { ...basket, status } : basket,
      ),
    );
  };
  // Kurye ataması yapılmamış sepetlerin taşınmasını engelle
  const handleDragStart = (start) => {
    const sourceId = start.source.droppableId;
    if (sourceId === "pending-baskets") {
      const movedBasket = baskets.find(
        (basket) => basket.id === start.draggableId,
      );
      if (!movedBasket.courier_id) {
        start.preventDefault();
      }
    }
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-10">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 dark:text-white text-slate-700">
            Sipariş Yönetimi
          </h1>
          <p className="mt-2 text-sm dark:text-gray-400 text-gray-500">
            Siparişlerinizi yönetebilirsiniz
          </p>
        </div>
      </div>
      {!isOrdersLoading && !isCouriersLoading && !isBasketsLoading && (
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className="flex gap-4">
            <Droppable droppableId="pending-orders">
              {(provided) => (
                <div
                  className="w-1/2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold">Bekleyen Siparişler</h2>
                  {orders.map((order, index) => (
                    <Draggable
                      key={order?.id}
                      draggableId={`${order?.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={classes.item}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="p-4 bg-gray-200 shadow rounded">
                            <h3 className="text-md font-semibold">
                              Sipariş #{order?.id}
                            </h3>
                            <p>{order.description}</p>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="pending-baskets">
              {(provided) => (
                <div
                  className="w-1/2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold">Hazırlanan Sepetler</h2>
                  {baskets
                    .filter((basket) => basket.status === "Hazırlanıyor")
                    .map((basket, index) => (
                      <Draggable
                        key={`${basket?.id}`}
                        draggableId={`${basket?.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={classes.item}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div className="p-4 bg-green-500 shadow rounded">
                              <h3 className="text-md font-semibold">
                                Sepet #{basket?.id}
                              </h3>
                              <div>
                                {basket.orders.map((orderId) => {
                                  const order = orders.find(
                                    (o) => o?.id === orderId,
                                  );
                                  return (
                                    <div key={order?.id}>
                                      <div className="p-2 bg-gray-200 shadow rounded my-2">
                                        <h4 className="text-md font-semibold">
                                          Ürün #{order?.id}
                                        </h4>
                                        <p>{order?.description}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>{" "}
                              <select
                                onChange={(e) =>
                                  handleAssignCourier(
                                    basket?.id,
                                    e.target.value,
                                  )
                                }
                                value={basket.courier_id || ""}
                                className="mt-2 p-2 border rounded"
                              >
                                <option value="" disabled>
                                  Kurye Seçin
                                </option>
                                {couriers.map((courier) => (
                                  <option key={courier?.id} value={courier?.id}>
                                    {courier.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="on-the-way-baskets">
              {(provided) => (
                <div
                  className="w-1/2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold">Yoldaki Sepetler</h2>
                  {baskets
                    .filter((basket) => basket.status === "Yolda")
                    .map((basket, index) => (
                      <Draggable
                        key={`${basket?.id}`}
                        draggableId={`${basket?.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={classes.item}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div className="p-4 bg-yellow-500 shadow rounded">
                              <h3 className="text-md font-semibold">
                                Sepet #{basket?.id}
                              </h3>
                              <div>
                                {basket.orders.map((orderId) => {
                                  const order = orders.find(
                                    (o) => o?.id === orderId,
                                  );
                                  return (
                                    <div key={order?.id}>
                                      <div className="p-2 bg-gray-200 shadow rounded my-2">
                                        <h4 className="text-md font-semibold">
                                          Ürün #{order?.id}
                                        </h4>
                                        <p>{order?.description}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="mt-2">
                                <button
                                  onClick={() =>
                                    handleDeliveryStatus(
                                      basket.id,
                                      "Teslim Edildi",
                                    )
                                  }
                                  className="p-2 bg-blue-500 text-white rounded"
                                >
                                  Teslim Edildi
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeliveryStatus(
                                      basket.id,
                                      "Teslim Edilemedi",
                                    )
                                  }
                                  className="p-2 bg-red-500 text-white rounded"
                                >
                                  Teslim Edilemedi
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      )}
    </div>
  );
};
export default OrderList;
