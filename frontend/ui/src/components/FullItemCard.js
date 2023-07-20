import { Card, Badge } from "react-bootstrap"

const FullItemCard = ({ item }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{item.item_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
        <Badge pill bg="secondary">Quantity: {item.quantity}</Badge>
        <Badge pill bg="secondary">Created By: {item.user_id}</Badge>
      </Card.Body>
    </Card>
  )
}

export default FullItemCard;