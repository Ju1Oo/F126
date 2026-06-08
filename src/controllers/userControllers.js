const crypto = require('crypto');

const User = require('../models/user');
const Item = require('../models/item');


const hashPassword = (password) => {
    return crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
};

exports.showLogin = (req, res) => {
    res.render('login', {
        error: null
    });
};

exports.showRegister = (req, res) => {
    res.render('register', {
        error: null
    });
};

exports.register = (req, res) => {

    const {
        name,
        phone,
        password
    } = req.body;

    if (
        !name ||
        !phone ||
        !password
    ) {
        return res.render(
            'register',
            {
                error: 'Wypełnij wszystkie pola'
            }
        );
    }

    const hashed =
        hashPassword(password);

    User.findByName(
        name,
        (err, user) => {

            if (err) {
                return res.render(
                    'register',
                    {
                        error: 'Błąd bazy danych'
                    }
                );
            }

            if (user) {
                return res.render(
                    'register',
                    {
                        error: 'Użytkownik już istnieje'
                    }
                );
            }

            User.create(
                name,
                phone,
                hashed,
                (err) => {

                    if (err) {
                        console.log(err);

                        return res.render(
                            'register',
                            {
                                error: 'Błąd bazy danych'
                            }
                        );
                    }

                    res.redirect('/login');
                }
            );
        }
    );
};

exports.login = (req, res) => {

    const { name, password } = req.body;

    const hashed = hashPassword(password);

    User.findByName(name, (err, user) => {

        if (err || !user) {
            return res.render('login', {
                error: 'Niepoprawne dane'
            });
        }

        if (user.password_hash !== hashed) {
            return res.render('login', {
                error: 'Niepoprawne dane'
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name
        };

        res.redirect('/market');
    });
};

exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect('/login');
    });
};

exports.showProfile = (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    User.findById(
        user.id,
        (err, currentUser) => {

            if (err || !currentUser) {
                return res.send('Błąd bazy danych');
            }

            Item.getUserItems(
                user.id,
                (err, items) => {

                    if (err) {
                        return res.send('Błąd bazy danych');
                    }

                    res.render(
                        'profile',
                        {
                            user: currentUser,
                            items
                        }
                    );
                }
            );
        }
    );
};

exports.addItem = (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    const {
        name,
        description,
        location,
        status
    } = req.body;

    if (
        !name ||
        !description ||
        !location
    ) {
        return res.redirect('/user/profile');
    }

    Item.create(
        {
            name,
            description,
            location,
            status,
            owner_id: user.id
        },
        (err) => {

            if (err) {
                return res.send('Błąd bazy danych');
            }

            res.redirect('/user/profile');
        }
    );
};

exports.showMarket = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const statusFilter = req.query.status;

    Item.getAll(statusFilter, (err, items) => {
        if (err) {
            console.error(err);
            return res.send('Błąd bazy danych');
        }

        res.render('market', {
            user: req.session.user,
            items: items,
            currentStatus: statusFilter 
        });
    });
};

exports.showItemDetails = (req, res) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    Item.findById(
        req.params.id,
        (err, item) => {

            if (err || !item) {
                return res.send('Nie znaleziono ogłoszenia');
            }

            res.render(
                'item-details',
                {
                    user: req.session.user,
                    item
                }
            );
        }
    );
};

exports.closeItem = (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    Item.findById(
        req.params.id,
        (err, item) => {

            if (err || !item) {
                return res.send('Nie znaleziono zgłoszenia');
            }

            if (item.owner_id !== user.id) {
                return res.send('Brak uprawnień');
            }

            Item.closeItem(
                item.id,
                (err) => {

                    if (err) {
                        return res.send('Błąd bazy danych');
                    }

                    res.redirect(
                        '/item/' + item.id
                    );
                }
            );
        }
    );
}

    exports.showEditItem = (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    Item.findById(
        req.params.id,
        (err, item) => {

            if (err || !item) {
                return res.send('Nie znaleziono zgłoszenia');
            }

            if (item.owner_id !== user.id) {
                return res.send('Brak uprawnień');
            }

            res.render(
                'edit-item',
                {
                    item
                }
            );
        }
    );
};

exports.updateItem = (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    const {
        name,
        description,
        location,
        status
    } = req.body;

    if (
        !name ||
        !description ||
        !location
    ) {
        return res.redirect(
            '/item/edit/' +
            req.params.id
        );
    }

    Item.findById(
        req.params.id,
        (err, item) => {

            if (
                err ||
                !item
            ) {
                return res.send(
                    'Nie znaleziono'
                );
            }

            if (
                item.owner_id !==
                user.id
            ) {
                return res.send(
                    'Brak uprawnień'
                );
            }

            Item.update(
                item.id,
                {
                    name,
                    description,
                    location,
                    status
                },
                (err) => {

                    if (err) {
                        return res.send(
                            'Błąd bazy danych'
                        );
                    }

                    res.redirect(
                        '/item/' +
                        item.id
                    );
                }
            );
        }
    );
};

exports.deleteItem = (req, res) => {

    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    Item.findById(
        req.params.id,
        (err, item) => {

            if (
                err ||
                !item
            ) {
                return res.send(
                    'Nie znaleziono'
                );
            }

            if (
                item.owner_id !==
                user.id
            ) {
                return res.send(
                    'Brak uprawnień'
                );
            }

            Item.delete(
                item.id,
                (err) => {

                    if (err) {
                        return res.send(
                            'Błąd bazy danych'
                        );
                    }

                    res.redirect(
                        '/user/profile'
                    );
                }
            );
        }
    );
};





