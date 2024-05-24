/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import swaggerUi from 'swagger-ui-express';

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
import { connectMongo } from '../mongo';
import swaggerDocument from '../../../../swagger/swagger_output.json';

import { isAuth } from './middlewares/IsAuth';

import { HeroAttributeRouter } from '@/superheroes/heroAttribute/routes/hero-attributes.routes';
import { logger } from '@/shared/container/providers/logger';

const app = express();
app.use(express.json());

app.use('/api/users', UsersRouter);
app.use('/api/login', AuthenticationRouter);
app.use('/api/alignment', isAuth, AlignmentRouter);
app.use('/api/attribute', isAuth, AttributeRouter);
app.use('/api/colour', isAuth, ColourRouter);
app.use('/api/gender', isAuth, GenderRouter);
app.use('/api/race', isAuth, RaceRouter);
app.use('/api/superhero', isAuth, SuperheroRouter);
app.use('/api/publisher', isAuth, PublisherRouter);
app.use('/api/superpower', isAuth, SuperpowerRouter);
app.use('/api/hero-attribute', isAuth, HeroAttributeRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectMongo()
  .then(() => logger.info('🌳 Mongo Connected'))
  .catch((error) => logger.error(`⛔ Mongo Connection Error: ${error}`));

export { app };
