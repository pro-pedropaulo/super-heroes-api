/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import swaggerConfig from '../../../config/swaggerConfig';
import { UsersRouter } from '../../../users/routes/users.routes';
import { AuthenticationRouter } from '../../../authentication/routes/authentication.routes';
import { AlignmentRouter } from '../../../superheroes/alignment/routes/alignment.routes';
import { AttributeRouter } from '../../../superheroes/attribute/routes/attribute.routes';
import { ColourRouter } from '../../../superheroes/colour/routes/colour.routes';
import { GenderRouter } from '../../../superheroes/gender/routes/gender.routes';
import { RaceRouter } from '../../../superheroes/race/routes/race.routes';
import { SuperheroRouter } from '../../../superheroes/superhero/routes/superhero.routes';
import { PublisherRouter } from '../../../superheroes/publisher/routes/publisher.routes';
import { SuperpowerRouter } from '../../../superheroes/superpower/routes/superpower.routes';

import { isAuth } from './middlewares/IsAuth';

import { HeroAttributeRouter } from '@/superheroes/heroAttribute/routes/hero-attributes.routes';

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerConfig);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Aplica o middleware de autenticação nas rotas que requerem autenticação
app.use('/users', UsersRouter);
app.use('/api/auth', AuthenticationRouter);
app.use('/api/alignments', isAuth, AlignmentRouter);
app.use('/api/attributes', isAuth, AttributeRouter);
app.use('/api/colours', isAuth, ColourRouter);
app.use('/api/genders', isAuth, GenderRouter);
app.use('/api/races', isAuth, RaceRouter);
app.use('/api/superheroes', isAuth, SuperheroRouter);
app.use('/api/publishers', isAuth, PublisherRouter);
app.use('/api/superpowers', isAuth, SuperpowerRouter);
app.use('/api/hero-attributes', isAuth, HeroAttributeRouter);

// Middleware de tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message, error: err });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
