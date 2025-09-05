import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { users as User } from '@/models/users';
import { initModels } from '@/models/init-models';
import sequelize from '@/lib/sequelize';

initModels(sequelize);

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email, and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'A user with this email or username already exists.' }, { status: 409 });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password_hash,
    });
    
    const { password_hash: _, ...userWithoutPassword } = newUser.get({ plain: true });

    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
