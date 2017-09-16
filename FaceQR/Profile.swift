//
//  Profile.swift
//  FaceQR
//
//  Created by Richard Ni on 2017-09-16.
//  Copyright © 2017 Richard Ni. All rights reserved.
//

import Foundation

public class Profile {
    
    private var name : String
    private var age : Int
    private var biography : String
    private var interests : [String]
    private var facebook : String?
    private var instagram : String?
    private var linkedin : String?
    private var snapchat : String?
    private var github : String?
    private var twitter : String?
    
    init(name : String, age : Int, biography : String, interests : [String], facebook : String?, instagram : String?, linkedin : String?, snapchat : String?, github : String?, twitter : String?) {
        self.name = name
        self.age = age
        self.biography = biography
        self.interests = interests
        self.facebook = facebook
        self.instagram = instagram
        self.linkedin = linkedin
        self.snapchat = snapchat
        self.github = github
        self.twitter = twitter
    }
    
}



