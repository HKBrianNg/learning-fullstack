function Logout() {
    localStorage.clear()

    return (
        <>
            <div>
                <h3>Thank you.</h3>
                <a href='http://localhost:3000/'>Access our site</a>
            </div>
        </>
    )
}

export default Logout