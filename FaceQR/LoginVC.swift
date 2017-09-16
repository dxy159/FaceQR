//
//  LoginUI.swift
//  FaceQR
//
//  Created by Rafsan Chowdhury on 9/16/17.
//  Copyright © 2017 Richard Ni. All rights reserved.
//

import UIKit
import Firebase
import MobileCoreServices

class LoginVC: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    @IBOutlet weak var facePic: UIImageView!
    
    @IBOutlet weak var verifyButton: RoundButton!
    private var imagePicker: UIImagePickerController!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func verify(_ sender: RoundButton) {
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
        self.facePic.layer.masksToBounds = true
        self.facePic.layer.cornerRadius = 10
        let mediaType = info[UIImagePickerControllerMediaType] as? String
        if mediaType == (kUTTypeImage as String) {
            // A PHOTO WAS TAKEN
           
            self.facePic.image = info[UIImagePickerControllerOriginalImage] as? UIImage // CANT CAST AS EXPLICITLY
            self.verifyButton.setTitle("Verifying...", for: .normal)
            
            // Do THE VERIFICATION HERE 
        
        } else {
            // A VIDEO WAS SHOT
        }
        
        self.dismiss(animated: true, completion: nil)
    }

}
