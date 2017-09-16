//
//  ViewController.swift
//  FaceQR
//
//  Created by Richard Ni on 2017-09-16.
//  Copyright © 2017 Richard Ni. All rights reserved.
//

import UIKit
import MobileCoreServices

class ViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
  
    @IBOutlet weak var imageView: UIImageView!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        
        if let image = info[UIImagePickerControllerOriginalImage] as? UIImage {
            imageView.image = image
            imageView.contentMode = .scaleAspectFit
            self.dismiss(animated: true, completion: nil)
        }
        
    }
    
    @IBAction func cameraAction(_ sender: UIButton) {
        
        if UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.camera) {
            let picker = UIImagePickerController()
            picker.delegate = self
            picker.sourceType = UIImagePickerControllerSourceType.camera
            picker.allowsEditing = true
            self.present(picker, animated: true, completion: nil)
        }

        
    }
    
    @IBAction func save(_ sender: UIButton) {
        
        let imageData = UIImageJPEGRepresentation(imageView.image!, 0.6)
        let compressImage = UIImage(data: imageData!)
        UIImageWriteToSavedPhotosAlbum(compressImage!, nil, nil, nil)
        
    }
    
    @IBAction func galleryButton(_ sender: UIButton) {
        
        if UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.photoLibrary) {
            let picker = UIImagePickerController()
            picker.delegate = self
            picker.sourceType = UIImagePickerControllerSourceType.photoLibrary
            picker.allowsEditing = true
            self.present(picker, animated: true, completion: nil)
        }
        
    }
    
    
}











