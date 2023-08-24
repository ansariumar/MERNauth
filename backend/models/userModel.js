import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
})

//  now every user created using this schema will have the matchPassowrd method, (eg user.matchPassword(passowrd))
userSchema.methods.matchPassword = async function (enteredPassowrd) {
    return await bcrypt.compare(enteredPassowrd, this.password);
}

const User = mongoose.model('User', userSchema)

export default User;