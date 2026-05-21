<?php
/**
 * Plugin Name: Laforet Designer — Paramètres du site
 * Description: Gestion centralisée des textes et contenus du site React depuis WordPress.
 * Version: 1.0
 * Author: Laforet Designer
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function laforet_initials( $name ) {
    $parts = array_filter( explode( ' ', trim( $name ) ) );
    $parts = array_values( $parts );
    $i     = strtoupper( substr( $parts[0] ?? 'X', 0, 1 ) );
    if ( count( $parts ) > 1 ) $i .= strtoupper( substr( end( $parts ), 0, 1 ) );
    return $i;
}

function laforet_defaults() {
    return [
        // Hero
        'laforet_hero_label'         => 'Agence de design créatif — Paris',
        'laforet_hero_title1'        => 'Laforet',
        'laforet_hero_title2'        => 'Designer.',
        'laforet_hero_description'   => "Nous façonnons des identités visuelles, communications globales et expériences digitales pour les marques qui veulent s'imposer.",
        'laforet_hero_cta_primary'   => 'Démarrer un projet',
        'laforet_hero_cta_secondary' => 'Voir les réalisations',
        // Stats
        'laforet_stat1_value'  => '5',   'laforet_stat1_suffix' => '/5',   'laforet_stat1_label' => 'Satisfaction client',
        'laforet_stat2_value'  => '100', 'laforet_stat2_suffix' => '+',    'laforet_stat2_label' => 'Projets réalisés',
        'laforet_stat3_value'  => '12',  'laforet_stat3_suffix' => ' ans', 'laforet_stat3_label' => "D'expérience",
        'laforet_stat4_value'  => '800', 'laforet_stat4_suffix' => 'h+',   'laforet_stat4_label' => 'De création',
        // Clients
        'laforet_clients' => 'Airpeak, Nordica, Maison Leroy, Atlas Studio, Green Pulse, Nexus, Volta, Lumiera, Meridian, Solaris, Forma, Kento',
        // Témoignage 1
        'laforet_testi1_name'    => 'Sophie Marchand',
        'laforet_testi1_role'    => 'CEO',
        'laforet_testi1_company' => 'Airpeak Technologies',
        'laforet_testi1_text'    => "Laforet Designer a transformé notre image de marque. L'équipe a saisi l'essence de notre vision et l'a traduite en une identité visuelle percutante. Nos prospects nous reconnaissent immédiatement.",
        // Témoignage 2
        'laforet_testi2_name'    => 'Thomas Renard',
        'laforet_testi2_role'    => 'Directeur Marketing',
        'laforet_testi2_company' => 'Maison Leroy',
        'laforet_testi2_text'    => "Un travail exceptionnel sur notre campagne. Créativité, rigueur et réactivité : Laforet incarne les valeurs que nous cherchions pour notre marque premium. Résultats au-delà de nos attentes.",
        // Témoignage 3
        'laforet_testi3_name'    => 'Camille Dufort',
        'laforet_testi3_role'    => 'Fondatrice',
        'laforet_testi3_company' => 'Nordica Foods',
        'laforet_testi3_text'    => "Notre identité de marque est maintenant à la hauteur de notre ambition. Laforet a créé quelque chose d'intemporel. Le packaging nous ouvre des portes que nous n'aurions pas pu franchir seuls.",
        // Coordonnées
        'laforet_contact_email'   => 'hello@laforetdesigner.com',
        'laforet_contact_phone'   => '+33 1 23 45 67 89',
        'laforet_contact_address' => 'Paris, France',
        // Réseaux sociaux
        'laforet_social_behance'  => '#',
        'laforet_social_linkedin' => '#',
        'laforet_social_youtube'  => '#',
        // Footer
        'laforet_footer_tagline' => 'Agence de design créatif. Branding, communication 360 et solutions digitales pour les marques ambitieuses.',
    ];
}

function laforet_textarea_fields() {
    return [
        'laforet_hero_description',
        'laforet_testi1_text', 'laforet_testi2_text', 'laforet_testi3_text',
        'laforet_clients',
        'laforet_footer_tagline',
    ];
}

// ─── Enregistrement settings ──────────────────────────────────────────────────

add_action( 'admin_init', function () {
    $textarea = laforet_textarea_fields();
    foreach ( laforet_defaults() as $key => $default ) {
        register_setting( 'laforet_settings_group', $key, [
            'sanitize_callback' => in_array( $key, $textarea )
                ? 'sanitize_textarea_field'
                : 'sanitize_text_field',
        ] );
    }
} );

// ─── Menu admin ───────────────────────────────────────────────────────────────

add_action( 'admin_menu', function () {
    add_menu_page(
        'Paramètres du site',
        '⚙️ Paramètres site',
        'manage_options',
        'laforet-settings',
        'laforet_render_settings_page',
        'dashicons-admin-customizer',
        4
    );
} );

// ─── Rendu de la page admin ───────────────────────────────────────────────────

function laforet_render_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) return;

    $defaults  = laforet_defaults();
    $textareas = laforet_textarea_fields();

    $sections = [
        '🖥️ Section Hero (page d\'accueil)' => [
            'laforet_hero_label'         => 'Label (ex : "Agence de design créatif — Paris")',
            'laforet_hero_title1'        => 'Titre ligne 1',
            'laforet_hero_title2'        => 'Titre ligne 2 (affiché en bleu)',
            'laforet_hero_description'   => 'Description sous le titre',
            'laforet_hero_cta_primary'   => 'Bouton principal (noir)',
            'laforet_hero_cta_secondary' => 'Bouton secondaire (contour)',
        ],
        '📊 Statistiques (bandeau noir)' => [
            'laforet_stat1_value' => 'Stat 1 — Nombre', 'laforet_stat1_suffix' => 'Stat 1 — Suffixe (ex : /5)', 'laforet_stat1_label' => 'Stat 1 — Label',
            'laforet_stat2_value' => 'Stat 2 — Nombre', 'laforet_stat2_suffix' => 'Stat 2 — Suffixe (ex : +)',  'laforet_stat2_label' => 'Stat 2 — Label',
            'laforet_stat3_value' => 'Stat 3 — Nombre', 'laforet_stat3_suffix' => 'Stat 3 — Suffixe (ex :  ans)', 'laforet_stat3_label' => 'Stat 3 — Label',
            'laforet_stat4_value' => 'Stat 4 — Nombre', 'laforet_stat4_suffix' => 'Stat 4 — Suffixe (ex : h+)', 'laforet_stat4_label' => 'Stat 4 — Label',
        ],
        '🏢 Bandeau clients (logos texte)' => [
            'laforet_clients' => 'Noms séparés par des virgules',
        ],
        '💬 Témoignage 1' => [
            'laforet_testi1_name' => 'Nom complet', 'laforet_testi1_role' => 'Poste',
            'laforet_testi1_company' => 'Entreprise', 'laforet_testi1_text' => 'Texte du témoignage',
        ],
        '💬 Témoignage 2' => [
            'laforet_testi2_name' => 'Nom complet', 'laforet_testi2_role' => 'Poste',
            'laforet_testi2_company' => 'Entreprise', 'laforet_testi2_text' => 'Texte du témoignage',
        ],
        '💬 Témoignage 3' => [
            'laforet_testi3_name' => 'Nom complet', 'laforet_testi3_role' => 'Poste',
            'laforet_testi3_company' => 'Entreprise', 'laforet_testi3_text' => 'Texte du témoignage',
        ],
        '📞 Coordonnées affichées' => [
            'laforet_contact_email'   => 'Email affiché',
            'laforet_contact_phone'   => 'Téléphone affiché',
            'laforet_contact_address' => 'Adresse affichée',
        ],
        '🔗 Réseaux sociaux' => [
            'laforet_social_behance'  => 'URL Behance',
            'laforet_social_linkedin' => 'URL LinkedIn',
            'laforet_social_youtube'  => 'URL YouTube',
        ],
        '🦶 Footer' => [
            'laforet_footer_tagline' => 'Tagline / description courte',
        ],
    ];
    ?>
    <div class="wrap">
        <h1 style="display:flex;align-items:center;gap:10px;">
            Paramètres du site — Laforet Designer
        </h1>
        <p style="color:#666;margin-bottom:24px;">
            Modifiez ici tous les textes statiques du site. Les changements sont en ligne immédiatement après enregistrement.
        </p>
        <?php settings_errors( 'laforet_settings_group' ); ?>
        <form method="post" action="options.php">
            <?php settings_fields( 'laforet_settings_group' ); ?>
            <?php foreach ( $sections as $section_title => $fields ) : ?>
                <h2 style="background:#1E40AF;color:#fff;padding:10px 16px;border-radius:4px;font-size:14px;">
                    <?= esc_html( $section_title ) ?>
                </h2>
                <table class="form-table" style="margin-bottom:8px;">
                    <?php foreach ( $fields as $key => $label ) :
                        $val = get_option( $key, $defaults[ $key ] ?? '' );
                        $is_textarea = in_array( $key, $textareas );
                    ?>
                    <tr>
                        <th scope="row" style="width:240px;">
                            <label for="<?= esc_attr( $key ) ?>"><?= esc_html( $label ) ?></label>
                        </th>
                        <td>
                            <?php if ( $is_textarea ) : ?>
                                <textarea
                                    name="<?= esc_attr( $key ) ?>"
                                    id="<?= esc_attr( $key ) ?>"
                                    rows="3"
                                    class="large-text"
                                ><?= esc_textarea( $val ) ?></textarea>
                            <?php else : ?>
                                <input
                                    type="text"
                                    name="<?= esc_attr( $key ) ?>"
                                    id="<?= esc_attr( $key ) ?>"
                                    value="<?= esc_attr( $val ) ?>"
                                    class="regular-text"
                                />
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </table>
            <?php endforeach; ?>
            <?php submit_button( '💾 Enregistrer les paramètres' ); ?>
        </form>
    </div>
    <?php
}

// ─── REST API endpoint ────────────────────────────────────────────────────────

add_action( 'rest_api_init', function () {
    register_rest_route( 'site/v1', '/settings', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'laforet_api_settings',
        'permission_callback' => '__return_true',
    ] );
} );

function laforet_api_settings() {
    $d = laforet_defaults();
    $g = fn( $key ) => get_option( $key, $d[ $key ] ?? '' );

    return rest_ensure_response( [
        'hero' => [
            'label'         => $g( 'laforet_hero_label' ),
            'title1'        => $g( 'laforet_hero_title1' ),
            'title2'        => $g( 'laforet_hero_title2' ),
            'description'   => $g( 'laforet_hero_description' ),
            'cta_primary'   => $g( 'laforet_hero_cta_primary' ),
            'cta_secondary' => $g( 'laforet_hero_cta_secondary' ),
        ],
        'stats' => [
            [ 'value' => (int) $g( 'laforet_stat1_value' ), 'suffix' => $g( 'laforet_stat1_suffix' ), 'label' => $g( 'laforet_stat1_label' ) ],
            [ 'value' => (int) $g( 'laforet_stat2_value' ), 'suffix' => $g( 'laforet_stat2_suffix' ), 'label' => $g( 'laforet_stat2_label' ) ],
            [ 'value' => (int) $g( 'laforet_stat3_value' ), 'suffix' => $g( 'laforet_stat3_suffix' ), 'label' => $g( 'laforet_stat3_label' ) ],
            [ 'value' => (int) $g( 'laforet_stat4_value' ), 'suffix' => $g( 'laforet_stat4_suffix' ), 'label' => $g( 'laforet_stat4_label' ) ],
        ],
        'clients' => array_values( array_filter( array_map( 'trim', explode( ',', $g( 'laforet_clients' ) ) ) ) ),
        'testimonials' => [
            [ 'id' => 1, 'name' => $g( 'laforet_testi1_name' ), 'role' => $g( 'laforet_testi1_role' ), 'company' => $g( 'laforet_testi1_company' ), 'text' => $g( 'laforet_testi1_text' ), 'initials' => laforet_initials( $g( 'laforet_testi1_name' ) ) ],
            [ 'id' => 2, 'name' => $g( 'laforet_testi2_name' ), 'role' => $g( 'laforet_testi2_role' ), 'company' => $g( 'laforet_testi2_company' ), 'text' => $g( 'laforet_testi2_text' ), 'initials' => laforet_initials( $g( 'laforet_testi2_name' ) ) ],
            [ 'id' => 3, 'name' => $g( 'laforet_testi3_name' ), 'role' => $g( 'laforet_testi3_role' ), 'company' => $g( 'laforet_testi3_company' ), 'text' => $g( 'laforet_testi3_text' ), 'initials' => laforet_initials( $g( 'laforet_testi3_name' ) ) ],
        ],
        'contact' => [
            'email'   => $g( 'laforet_contact_email' ),
            'phone'   => $g( 'laforet_contact_phone' ),
            'address' => $g( 'laforet_contact_address' ),
        ],
        'social' => [
            'behance'  => $g( 'laforet_social_behance' ),
            'linkedin' => $g( 'laforet_social_linkedin' ),
            'youtube'  => $g( 'laforet_social_youtube' ),
        ],
        'footer' => [
            'tagline' => $g( 'laforet_footer_tagline' ),
        ],
    ] );
}
