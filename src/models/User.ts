import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    email: string;
    senha: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    senha: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});