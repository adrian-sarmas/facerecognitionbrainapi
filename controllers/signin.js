const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json('Incorrect form submission');
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'));
        }
        else {
            res.status(400).json('Wrong credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'));


    // Load hash from your password DB.
    bcrypt.compare("toro", '$2a$10$DzQZOy/oU3NTuN0/WQF3p.g3TQo3fVT8fGkQHPGes6kTw8CV/7uuG', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$DzQZOy/oU3NTuN0/WQF3p.g3TQo3fVT8fGkQHPGes6kTw8CV/7uuG', function(err, res) {
        console.log('second guess', res);
    })
};

module.exports = {
    handleSignIn: handleSignIn
};