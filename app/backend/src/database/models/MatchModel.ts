/* import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: { type: INTEGER, allowNull: false },
  homeTeamGoals: { type: INTEGER, allowNull: false },
  awayTeam: { type: INTEGER, allowNull: false },
  awayTeamGoals: { type: INTEGER, allowNull: false },
  inProgress: { type: BOOLEAN, allowNull: false },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

export default Match; */