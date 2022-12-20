<?php
 
namespace App\Service;
 
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\UrlHelper;
 
class FileUploader
{
    private $uploadPath;
    private $slugger;
    private $urlHelper;
    private $relativeUploadsDir;
 
    public function __construct($publicPath, $uploadPath, SluggerInterface $slugger, UrlHelper $urlHelper)
    {
        $this->uploadPath = $uploadPath;
        $this->slugger = $slugger;
        $this->urlHelper = $urlHelper;
 
        // get uploads directory relative to public path //  "/uploads/"
        $this->relativeUploadsDir = str_replace($publicPath, '', $this->uploadPath).'/';
    }
 
    public function upload(UploadedFile $file, $referenceNumber)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $fileName = $referenceNumber.'.'.$file->guessExtension();
        try {
            $file->move($this->getuploadPath(), $fileName);
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }
 
        return $fileName;
    }

    public function update($file, $referenceNumber, $oldThumbnail) 
    {
        $originalFilename = pathinfo($file["name"], PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $fileName = $referenceNumber.'.'.pathinfo($file["name"])["extension"];
        try {
            //unlink when update image
            if (file_exists($this->getuploadPath() . "/" . $oldThumbnail)){
                unlink($this->getuploadPath() . "/" . $oldThumbnail);
            }

            rename($file["tmp_name"], $this->getuploadPath()."/".$fileName);
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }
 
        return $fileName;
    }

    public function rename($oldName, $newName)
    {
        if (!file_exists($this->getuploadPath() . "/" . $oldName)){
            return null;
        }
        try {

            $extension = pathinfo($this->getuploadPath() . "/" . $oldName)["extension"];
            $fileName = $newName . "." .  $extension;
            rename($this->getuploadPath() . "/" . $oldName, $this->getuploadPath() . "/" . $fileName);
        }
        catch (FileException $e) {
        }

        return $fileName;

    }
 
    public function getuploadPath()
    {
        return $this->uploadPath;
    }
 
    public function getUrl(?string $fileName, bool $absolute = true)
    {
        if (empty($fileName)) return null;
 
        if ($absolute) {
            return $this->urlHelper->getAbsoluteUrl($this->relativeUploadsDir.$fileName);
        }
 
        return $this->urlHelper->getRelativePath($this->relativeUploadsDir.$fileName);
    }
}