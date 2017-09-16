//
//  CreateAccountVC.swift
//  FaceQR
//
//  Created by Rafsan Chowdhury on 9/16/17.
//  Copyright © 2017 Richard Ni. All rights reserved.
//

import UIKit
import Firebase
import MobileCoreServices

class CreateAccountVC: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    @IBOutlet weak var takePicButton: UIButton!
    @IBOutlet weak var faceImage: UIImageView!

    @IBOutlet weak var fullName: UITextField!
    @IBOutlet weak var age: UITextField!
    @IBOutlet weak var interests: UITextField!
    @IBOutlet weak var bio: UITextField!
    
    @IBOutlet weak var facebook: UITextField!
    @IBOutlet weak var instagram: UITextField!
    @IBOutlet weak var linkedin: UITextField!
    @IBOutlet weak var snapchat: UITextField!
    @IBOutlet weak var github: UITextField!
    @IBOutlet weak var twitter: UITextField!
    
    private var imagePicker: UIImagePickerController!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBAction func takePicPressed(_ sender: Any) {
        self.takePicButton.isHidden = true
        self.imagePicker = UIImagePickerController()
        self.imagePicker.delegate = self
        
        if (UIImagePickerController.isSourceTypeAvailable(.camera)) {
            imagePicker.sourceType = .camera
        } else {
            imagePicker.sourceType = .photoLibrary
        }
        self.imagePicker.allowsEditing = true
        // No need since we only want the photo
        
        //self.imagePicker.mediaTypes = UIImagePickerController.availableMediaTypes(for: imagePicker.sourceType)!
        self.present(imagePicker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        self.faceImage.layer.masksToBounds = true
        self.faceImage.layer.cornerRadius = 10
        let mediaType = info[UIImagePickerControllerMediaType] as? String
        if mediaType == (kUTTypeImage as String) {
            // A PHOTO WAS TAKEN
            
            self.faceImage.image = info[UIImagePickerControllerOriginalImage] as? UIImage // CANT CAST AS EXPLICITLY
            
            // Do THE VERIFICATION HERE
            
        } else {
            // A VIDEO WAS SHOT
        }
        
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func createAccountPressed(_ sender: Any) {
        
    }
}
