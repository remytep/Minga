<?php
 
namespace App\Service;
 
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\UrlHelper;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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
 
    public function upload(UploadedFile $file, $name, $path = NULL)
    {
        //$originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        //$safeFilename = $this->slugger->slug($originalFilename);
        $fileName = $name.'.'.$file->guessExtension();
        try {
            $file->move($this->getuploadPath() . "/" . $path . "/", $fileName);
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }
 
        return $path . "/" . $fileName;
    }

    public function update($file, $name, $path, $oldThumbnail) 
    {
        $fullPath = $this->getuploadPath(). "/" . $path;
        //$originalFilename = pathinfo($file["name"], PATHINFO_FILENAME);
        //$safeFilename = $this->slugger->slug($originalFilename);
        $fileName = $name.'.'.pathinfo($file["name"])["extension"];
        try {
            //unlink when update image
            if (file_exists($this->getuploadPath(). "/" . $oldThumbnail)){
                unlink($this->getuploadPath(). "/" . $oldThumbnail);
            }
            rename($file["tmp_name"], $fullPath."/".$fileName);
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }
        return $path . "/" . $fileName;
    }

    public function rename($oldName, $newName, $path)
    {
        $fullPath = $this->getuploadPath(). "/" . $path;

        if (!file_exists($this->getuploadPath() . "/" . $oldName)){
            throw new BadRequestHttpException('Thumbnail cannot be updated or does not exist');
        }
        try {
            $extension = pathinfo($fullPath . "/" . $oldName)["extension"];
            $fileName = $newName . "." .  $extension;
            rename($this->getuploadPath() . "/" . $oldName, $fullPath . "/" . $fileName);
        }
        catch (FileException $e) {
        }

        return $path . "/" . $fileName;

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