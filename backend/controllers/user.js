
export const signin = async (req, res) => {

    const { email, password } = req.body;
    try {
        return res.status(200).json({ message: "Singin success." });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}

export const signup = () => {
    const { email, password } = req.body;
    try {
        return res.status(200).json({ message: "Singup success." });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}

export const getusers = (req, res) => {
    res.status(200).json([
        {
            id: 1,
            email: "ngshunchiang@hotmail.com",
            name: "Brian Ng"
        },
        {
            id: 2,
            email: "lintingting@hotmail.com",
            name: "Diana Lin"
        },
        {
            id: 3,
            email: "ansonng@hotmail.com",
            name: "Anson Ng"
        }
    ])
}