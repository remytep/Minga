<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221223110911 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE view_count DROP FOREIGN KEY FK_E7FAE3714584665A');
        $this->addSql('ALTER TABLE view_count DROP FOREIGN KEY FK_E7FAE371A76ED395');
        $this->addSql('DROP TABLE view_count');
        $this->addSql('ALTER TABLE product ADD view_count INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE view_count (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, product_id INT NOT NULL, date DATE NOT NULL, INDEX IDX_E7FAE371A76ED395 (user_id), INDEX IDX_E7FAE3714584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE view_count ADD CONSTRAINT FK_E7FAE3714584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE view_count ADD CONSTRAINT FK_E7FAE371A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE product DROP view_count');
    }
}
