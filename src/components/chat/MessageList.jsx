import img from "./img/img.png"
const MessageList = ({messages}) => (
        <ul style={{
            position: "relative",
            display: "flex",
            flexDirection:"column",
            gap:"10px",
            maxWidth:"250px",
            alignItems:"end",
            listStyle:"none",

        }}>
            {messages.map((message, index) => (
                    <div className="message">
                    <div className="message_field" key={index}>
                        <li style={{

                            maxWidth:"250px"
                        }}>{message}</li>
                    </div>

                        <div>
                        <img className="message_field__avavtar" src={img} /*onClick={() => navigate('/')} style={{cursor: 'pointer'}*//>
                        </div>
                    </div>
            ))}
        </ul>
);
export default MessageList;
