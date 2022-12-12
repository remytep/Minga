<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221211175804 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sku_value DROP FOREIGN KEY FK_3A7BBDD4C964ABE2');
        $this->addSql('DROP INDEX IDX_3A7BBDD4C964ABE2 ON sku_value');
        $this->addSql('ALTER TABLE sku_value DROP product_option_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sku_value ADD product_option_id INT NOT NULL');
        $this->addSql('ALTER TABLE sku_value ADD CONSTRAINT FK_3A7BBDD4C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_3A7BBDD4C964ABE2 ON sku_value (product_option_id)');
    }
}
