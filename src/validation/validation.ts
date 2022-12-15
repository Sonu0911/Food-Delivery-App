import mongoose from "mongoose"

// for string ;
export const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// for mobile
export const isValidPhone = (mobile)=> {
    const phone = /^[6-9]\d{9}$/
    return phone.test(mobile);
};
// for email;
export const isValidEmail = (email)=> {
    const mail = /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/
    return mail.test(email);
};

// for passcode

export const isValidPasscode = (passcode)=> {
    const pass = /[0-9]/
    return pass.test(passcode);
};

// for objectId;
export const isValidObjectId = (objectId: string)=> {
    return mongoose.Types.ObjectId.isValid(objectId)
}

// for pincode;
export const isValidPincode = (pincode)=> {
    const pin = /^[1-9][0-9]{5}$/
    return pin.test(pincode);
};

// for link;
export const isValidImageLink = (image)=> {
    var link = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return link.test(image);
}


