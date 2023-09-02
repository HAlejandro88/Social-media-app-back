const User = require('../../models/user.model')
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server')
const {validateRegisterInput, validateLoginInput} = require('../../util/validators');
const getToken = require('../../util/getToken');
 

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find()
                return users
            } catch (e) {
                throw new Error(e)
            }
        }
    },
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}}, context, info) {
            
            const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword)

            if(!valid) {
                throw new UserInputError('Errors',{errors})
            }

            const user = await User.findOne({username})

            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password,
            })

            const response = await newUser.save()


            const token = getToken(response)

            return {
                ...response._doc,
                id: newUser._id,
                token
            }
        },

        async login(_, {username, password}, context, info) {
            const {errors, valid} = validateLoginInput(username, password)


            if(!valid) {
                throw new UserInputError('Wrong credentials', { errors })
            }

            const user = await User.findOne({username})

            if(!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }

            const match = await bcrypt.compare(password, user.password)

            if(!match) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }

            const token = getToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }

        }
    }
}