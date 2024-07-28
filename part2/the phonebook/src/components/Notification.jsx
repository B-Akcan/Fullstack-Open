const Notification = ({message, setMessage}) => {
    const style = {
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message.type == "success")
        style.color = "green"
    else if (message.type == "failure")
        style.color = "red"

    if (message.text != "") {
        setTimeout(() => {
            setMessage({text: "", type: ""})
        }, 5000)

        return (
            <div style={style}>{message.text}</div>
        )
    }
}

export default Notification