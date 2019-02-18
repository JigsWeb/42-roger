import bodyParser from 'body-parser';
import cors from 'cors'
import jwt from 'jsonwebtoken'

function init(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
}

export function AuthMiddleware(req, res, next) {
    jwt.verify(req.get('Authentification'), 'privateKeyDuFutur', err =>
        err ? res.sendStatus(401) : next());
};

export default init;