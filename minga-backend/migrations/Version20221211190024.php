<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221211190024 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sku ADD CONSTRAINT FK_F9038C4EBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id)');
        $this->addSql('CREATE INDEX IDX_F9038C4EBDCCF9B ON sku (product_option_value_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sku DROP FOREIGN KEY FK_F9038C4EBDCCF9B');
        $this->addSql('DROP INDEX IDX_F9038C4EBDCCF9B ON sku');
    }
}
