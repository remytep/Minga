<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230113093732 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` ADD id_tracking VARCHAR(255) DEFAULT NULL, CHANGE total_amount total_amount DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE product CHANGE view_count view_count INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product CHANGE view_count view_count INT NOT NULL');
        $this->addSql('ALTER TABLE `order` DROP id_tracking, CHANGE total_amount total_amount INT NOT NULL');
    }
}
